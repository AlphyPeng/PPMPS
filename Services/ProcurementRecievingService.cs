using PPMPS.Data;
using PPMPS.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace PPMPS.Services
{
    public class ProcurementRecievingService
    {
        #region Receiving
        public List<PPMP_ProcurementPlanModel> Get_ProcurementForRR()
        {
            var list = new List<PPMP_ProcurementPlanModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_ProcurementReceiving";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "READ");
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_ProcurementPlanModel model;
                        while (dr.Read())
                        {
                            model = new PPMP_ProcurementPlanModel();
                            model.PPMPCode = dr["PPMPCode"].ToString();
                            model.ProgramTitle = dr["ProgramTitle"].ToString();
                            model.AccountTitle = dr["AccountTitle"].ToString();
                            model.Department = dr["Department"].ToString();
                            model.DeliverySchedule = dr["DeliverySchedule"].ToString();
                            model.PaymentTerms = dr["PaymentTerms"].ToString();
                            model.Description = dr["Description"].ToString();
                            model.Status = dr["Status"].ToString();
                            list.Add(model);
                        }
                    }
                }

            }
            catch (Exception)
            {
            }
            return list;
        }

        public List<PPMP_ProcurementPlanModel> Get_RR_Details(string code)
        {
            var list = new List<PPMP_ProcurementPlanModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_ProcurementReceiving";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "READ_DETAILS");
                        command.Parameters.AddWithValue("@PPMPCode", code);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_ProcurementPlanModel model;
                        while (dr.Read())
                        {
                            model = new PPMP_ProcurementPlanModel();
                            model.PPMPCode = dr["PPMPCode"].ToString();
                            model.LineItem = dr["LineItem"].ToString();
                            model.ItemName = dr["ItemName"].ToString();
                            model.UnitOfIssue = dr["UnitOfIssue"].ToString();
                            model.Qty = (int)dr["Qty"];
                            model.UnitCost = (decimal)dr["UnitCost"];
                            model.Amount = (decimal)dr["Amount"];
                            list.Add(model);
                        }
                    }
                }
            }
            catch (Exception)
            {
            }
            return list;
        }

        public List<PPMP_SupplierModel> GetSupplierList()
        {
            var list = new List<PPMP_SupplierModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_ProcurementReceiving";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "GET_Supplier");
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_SupplierModel model;
                        while (dr.Read())
                        {
                            model = new PPMP_SupplierModel();
                            model.SupplierCode = dr["SupplierCode"].ToString();
                            model.SupplierName = dr["SupplierName"].ToString();
                            list.Add(model);
                        }
                    }
                }
            }
            catch (Exception)
            {
            }
            return list;
        }

        public void AssignToSupplier(string code, string supplierCode)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_ProcurementReceiving";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "RECIEVED");
                        command.Parameters.AddWithValue("@PPMPCode", code);
                        command.Parameters.AddWithValue("@SupplierCode", supplierCode);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
            }
        }
        #endregion
    }
}