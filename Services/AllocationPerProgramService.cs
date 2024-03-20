using PPMPS.Data;
using PPMPS.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System;

namespace PPMPS.Services
{
    public class AllocationPerProgramService
    {
        public List<PPMP_AllocationPerProgramModel> GetPPMP_Codes(string action, string option)
        {
            var list = new List<PPMP_AllocationPerProgramModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerProgram";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", action);
                        command.Parameters.AddWithValue("@Option", option);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_AllocationPerProgramModel model;
                        while (dr.Read())
                        {
                            model = new PPMP_AllocationPerProgramModel();
                            if (action == "READ_LIST_CODE")
                            {
                                model.PPMPCode = dr["PPMPCode"].ToString();
                            }
                            else if (action == "READ_PROGRAMLIST")
                            {
                                model.ProgramId = dr["Id"].ToString();
                                model.ProgramTitle = dr["ProgramName"].ToString();
                            }
                            list.Add(model);
                        }
                    }
                }

                return list;
            }
            catch (System.Exception)
            {

                throw;
            }
        }

        public List<PPMP_AllocationPerProgramModel> GetPPMP_ProgramAllocation_Headers(string ppmpCodes)
        {
            var list = new List<PPMP_AllocationPerProgramModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerProgram";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "READ_PPMPDETAILS");
                        command.Parameters.AddWithValue("@PPMPCode", ppmpCodes);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_AllocationPerProgramModel model;
                        while (dr.Read())
                        {
                            model = new PPMP_AllocationPerProgramModel();
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
                            list.Add(model);
                        }
                    }
                }
                return list;
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public void AllocateorApprove(PPMP_AllocationPerProgramModel allocPerProgram)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerProgram";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", allocPerProgram.Action);
                        command.Parameters.AddWithValue("@PPMPCode", allocPerProgram.PPMPCode);
                        command.Parameters.AddWithValue("@LineItem", allocPerProgram.LineItem);
                        command.Parameters.AddWithValue("@Program", allocPerProgram.ProgramId);
                        command.Parameters.AddWithValue("@ItemName", allocPerProgram.ItemName);                    
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public List<PPMP_AllocationPerProgramModel> Get_Totals(string code)
        {
            var list = new List<PPMP_AllocationPerProgramModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerProgram";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "Get_Total");
                        command.Parameters.AddWithValue("@PPMPCode", code);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_AllocationPerProgramModel model;
                        while (dr.Read())
                        {
                            model = new PPMP_AllocationPerProgramModel();
                            model.Total = (int)dr["SumQty"];
                            model.TotalAmount = Convert.ToDecimal(dr["SumAmount"]);
                            model.TotalUnitCost = Convert.ToDecimal(dr["SumUnitCost"]);
                            list.Add(model);
                        }
                    }
                }
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}