using PPMPS.Data;
using PPMPS.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System;

namespace PPMPS.Services
{
    public class AllocationPerDistrictService
    {
        public List<PPMP_AllocationPerDistrictModel> PPMP_Codes(string action, string option)
        {
            var list = new List<PPMP_AllocationPerDistrictModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerDistrict";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", action);
                        command.Parameters.AddWithValue("@Option", option);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_AllocationPerDistrictModel model;
                        while (dr.Read())
                        {
                            model = new PPMP_AllocationPerDistrictModel();
                            if (action == "READ_LIST_CODE")
                            {
                                model.PPMPCode = dr["PPMPCode"].ToString();
                            }
                            else if (action == "READ_DISTRICTLIST")
                            {
                                model.DistrictId = dr["DistrictId"].ToString();
                                model.DistrictName = dr["Name"].ToString();
                            }
                            list.Add(model);
                        }
                    }
                }
                //return list;
            }
            catch (System.Exception)
            {
                //do nothing
            }
            return list;
        }

        public List<PPMP_AllocationPerDistrictModel> GetPPMP_DistrictAllocation_Headers(string ppmpCodes)
        {
            var list = new List<PPMP_AllocationPerDistrictModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerDistrict";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "READ_PPMPDETAILS");
                        command.Parameters.AddWithValue("@PPMPCode", ppmpCodes);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_AllocationPerDistrictModel model;
                        while (dr.Read())
                        {
                            model = new PPMP_AllocationPerDistrictModel();
                            model.PPMPCode = dr["PPMPCode"].ToString();
                            model.ProgramTitle = dr["ProgramTitle"].ToString();
                            model.AccountTitle = dr["AccountTitle"].ToString();
                            model.Status = dr["Status"].ToString();
                            model.LineItem = dr["LineItem"].ToString();
                            model.ItemName = dr["ItemName"].ToString();
                            model.UnitOfIssue = dr["UnitOfIssue"].ToString();
                            model.Qty = (int)dr["Qty"];
                            model.UnitCost = Convert.ToDecimal(dr["UnitCost"]);
                            model.Amount = Convert.ToDecimal(dr["Amount"]);
                            model.ProgramId = dr["ProgramId"].ToString();
                            model.DistrictId = dr["DistrictId"].ToString();
                            list.Add(model);
                        }
                    }
                }
                //return list;
            }
            catch (System.Exception)
            {
                //do nothing
            }
            return list;
        }

        public void AllocateorApprove(PPMP_AllocationPerDistrictModel allocPerDistrict)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerDistrict";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", allocPerDistrict.Action);
                        command.Parameters.AddWithValue("@PPMPCode", allocPerDistrict.PPMPCode);
                        command.Parameters.AddWithValue("@LineItem", allocPerDistrict.LineItem);
                        command.Parameters.AddWithValue("@District", allocPerDistrict.DistrictId);
                        command.Parameters.AddWithValue("@ItemName", allocPerDistrict.ItemName);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public List<PPMP_AllocationPerDistrictModel> Get_Totals(string code)
        {
            var list = new List<PPMP_AllocationPerDistrictModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerDistrict";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "Get_Total");
                        command.Parameters.AddWithValue("@PPMPCode", code);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_AllocationPerDistrictModel model;
                        while (dr.Read())
                        {
                            model = new PPMP_AllocationPerDistrictModel();
                            model.Total = (int)dr["SumQty"];
                            model.TotalAmount = Convert.ToDecimal(dr["SumAmount"]);
                            model.TotalUnitCost = Convert.ToDecimal(dr["SumUnitCost"]);
                            list.Add(model);
                        }
                    }
                }             
            }
            catch (Exception)
            {
                //do nothing
            }
            return list;
        }
        
    }
}