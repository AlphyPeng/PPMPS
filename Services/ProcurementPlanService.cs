using PPMPS.Common;
using PPMPS.Data;
using PPMPS.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace PPMPS.Services
{
    public class ProcurementPlanService
    {
        #region Headers
        public string Generate_TransactionNo()
        {
            var  NextCode = "";
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_ProcurementPlan";
                        command.Parameters.AddWithValue("@Action", "Generate_PPMP_Series");
                        command.CommandType = CommandType.StoredProcedure;
                        NextCode = command.ExecuteScalar().ToString();
                    }
                }
            }
            catch
            {
            }
            return NextCode;
        }

        public List<PPMP_ProcurementPlanModel> Get_Totals(string code)
        {
            var list = new List<PPMP_ProcurementPlanModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_ProcurementPlan";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "Get_Total");
                        command.Parameters.AddWithValue("@PPMPCode", code);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_ProcurementPlanModel model;
                        while (dr.Read())
                        {
                            model = new PPMP_ProcurementPlanModel();
                            model.Total = dr["totals"].ToString();
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

        public List<PPMP_ProcurementPlanModel> Get_PPMP_CodeLists()
        {
            var list = new List<PPMP_ProcurementPlanModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_ProcurementPlan";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "Get_PPMP_Codes");
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_ProcurementPlanModel model;
                        while (dr.Read())
                        {
                            model = new PPMP_ProcurementPlanModel();
                            model.PPMPCode = dr["PPMPCode"].ToString();
                            model.DeliverySchedule = dr["DeliverySchedule"].ToString();
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

        public List<PPMP_ProcurementPlanModel> Get_PPMP_Header(string code)
        {
            var list = new List<PPMP_ProcurementPlanModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_ProcurementPlan";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "Get_PPMP_Header");
                        command.Parameters.AddWithValue("@PPMPCode", code);
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

        public void AddOrEditHeader(PPMP_ProcurementPlanModel model)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_ProcurementPlan";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", model.Action);
                        command.Parameters.AddWithValue("@UserName", PPMP_Helpers.UserName);
                        command.Parameters.AddWithValue("@PPMPCode", model.PPMPCode);
                        command.Parameters.AddWithValue("@ProgramTitle", model.ProgramTitle);
                        command.Parameters.AddWithValue("@AccountTitle", model.AccountTitle);
                        command.Parameters.AddWithValue("@Department", model.Department);
                        command.Parameters.AddWithValue("@DeliverySchedule", model.DeliverySchedule);
                        command.Parameters.AddWithValue("@PaymentTerms", model.PaymentTerms);
                        command.Parameters.AddWithValue("@Description", model.Description);
                        command.Parameters.AddWithValue("@Id", model.Id);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
            }
        }

        public void CancelHeader(string code)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_ProcurementPlan";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "Cancel_Header");
                        command.Parameters.AddWithValue("@PPMPCode", code);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
            }
        }

        public void UpdateStatus(string code,decimal totalCost,decimal totalAmount, int qty)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_ProcurementPlan";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "Update_Status");
                        command.Parameters.AddWithValue("@TotalUnitCost", totalCost);
                        command.Parameters.AddWithValue("@TotalAmount", totalAmount);
                        command.Parameters.AddWithValue("@Qty", qty);
                        command.Parameters.AddWithValue("@PPMPCode", code);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region Details
        public List<PPMP_ProcurementPlanModel> GetDetails(string code)
        {
            var list = new List<PPMP_ProcurementPlanModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_ProcurementPlan";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "Get_Details");
                        command.Parameters.AddWithValue("@PPMPCode", code);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_ProcurementPlanModel model;
                        while (dr.Read())
                        {
                            model = new PPMP_ProcurementPlanModel();
                            model.LineItem = dr["LineItem"].ToString();
                            model.StockNo = dr["StockNo"].ToString();
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

        public void AddOrEditDetails(PPMP_ProcurementPlanModel model)
        {
            try
            {
                if (model.Action == "Add")
                {
                    using (var connection = PPMP_Connection.Create())
                    {
                        using (var command = connection.CreateCommand())
                        {
                            connection.Open();
                            command.CommandText = "USP_T_ProcurementPlan";
                            command.CommandType = CommandType.StoredProcedure;
                            command.Parameters.AddWithValue("@Action", "Add_Details");
                            command.Parameters.AddWithValue("@PPMPCode", model.PPMPCode);
                            command.Parameters.AddWithValue("@LineItem", model.LineItem);
                            command.Parameters.AddWithValue("@StockNo", model.StockNo);
                            command.Parameters.AddWithValue("@ItemName", model.ItemName);
                            command.Parameters.AddWithValue("@UnitOfIssue", model.UnitOfIssue);
                            command.Parameters.AddWithValue("@Qty", model.Qty);
                            command.Parameters.AddWithValue("@UnitCost", model.UnitCost);
                            command.Parameters.AddWithValue("@Amount", model.Amount);
                            command.ExecuteNonQuery();
                        }
                    }
                }
                else
                {
                    using (var connection = PPMP_Connection.Create())
                    {
                        using (var command = connection.CreateCommand())
                        {
                            connection.Open();
                            command.CommandText = "USP_T_ProcurementPlan";
                            command.CommandType = CommandType.StoredProcedure;
                            command.Parameters.AddWithValue("@Action", "Update_Details");
                            command.Parameters.AddWithValue("@PPMPCode", model.PPMPCode);
                            command.Parameters.AddWithValue("@StockNo", model.StockNo);
                            command.Parameters.AddWithValue("@LineItem", model.LineItem);
                            command.Parameters.AddWithValue("@ItemName", model.ItemName);
                            command.Parameters.AddWithValue("@UnitOfIssue", model.UnitOfIssue);
                            command.Parameters.AddWithValue("@Qty", model.Qty);
                            command.Parameters.AddWithValue("@UnitCost", model.UnitCost);
                            command.Parameters.AddWithValue("@Amount", model.Amount);
                            command.ExecuteNonQuery();
                        }
                    }
                }
            }
            catch (Exception)
            {
            }
        }

        public void DeleteDetails(string code, string lineNo)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_ProcurementPlan";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "Delete_Details");
                        command.Parameters.AddWithValue("@PPMPCode", code);
                        command.Parameters.AddWithValue("@LineItem", lineNo);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
            }
        }

        public List<PPMP_MedicineModel> GetMedicineList()
        {
            var list = new List<PPMP_MedicineModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_ProcurementPlan";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "Get_Medicine");
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_MedicineModel model;
                        while (dr.Read())
                        {
                            model = new PPMP_MedicineModel();
                            model.StockNo = dr["StockNo"].ToString();
                            model.MedicineName = dr["MedicineName"].ToString();
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
        #endregion



    }
}