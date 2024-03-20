using PPMPS.Common;
using PPMPS.Data;
using PPMPS.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace PPMPS.Services
{
    public class MedicineService
    {
        public List<PPMP_MedicineModel> GetMedicines()
        {
            var list = new List<PPMP_MedicineModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Medicine";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "READ");
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_MedicineModel medicine;
                        while (dr.Read())
                        {
                            medicine = new PPMP_MedicineModel();
                            medicine.Id = dr["Id"].ToString();
                            medicine.StockNo = dr["StockNo"].ToString();
                            medicine.BatchNo = dr["BatchNo"].ToString();
                            medicine.Brand = dr["Brand"].ToString();
                            medicine.MedicineName = dr["MedicineName"].ToString();
                            medicine.Description = dr["Description"].ToString();
                            medicine.Unit = dr["Unit"].ToString();
                            medicine.ThresHold = (int)dr["ThresHold"];
                            medicine.Quantity = (int)dr["Quantity"];
                            medicine.ExpiryDate = dr["ExpiryDate"].ToString();
                            medicine.Remarks = dr["Remarks"].ToString();
                            list.Add(medicine);
                        }
                    }
                }
            }
            catch (Exception)
            {
            }
            return list;
        }

        public void AddOrEdit(PPMP_MedicineModel medicine)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Medicine";
                        command.Parameters.AddWithValue("@Action", medicine.Action);
                        command.Parameters.AddWithValue("@UserName", PPMP_Helpers.UserName);
                        command.Parameters.AddWithValue("@StockNo", medicine.StockNo);
                        command.Parameters.AddWithValue("@BatchNo", medicine.BatchNo);
                        command.Parameters.AddWithValue("@Brand", medicine.Brand);
                        command.Parameters.AddWithValue("@MedicineName", medicine.MedicineName);
                        command.Parameters.AddWithValue("@Description", medicine.Description);
                        command.Parameters.AddWithValue("@Unit", medicine.Unit);
                        command.Parameters.AddWithValue("@Qty", medicine.Quantity);
                        command.Parameters.AddWithValue("@ExpiryDate", medicine.ExpiryDate);
                        command.Parameters.AddWithValue("@Remarks", medicine.Remarks);
                        command.Parameters.AddWithValue("@Id", medicine.Id);
                        command.CommandType = CommandType.StoredProcedure;
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
            }
        }

        public string StockNo()
        {
            var StockNo = "";
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Medicine";
                        command.Parameters.AddWithValue("@Action", "GETNEXTSTOCKNO");
                        command.CommandType = CommandType.StoredProcedure;
                        StockNo = command.ExecuteScalar().ToString();
                    }
                }

            }
            catch (Exception)
            {
            }

            return StockNo;
        }

        public void Delete(int Id)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Medicine";
                        command.Parameters.AddWithValue("@Action", "DELETE");
                        command.Parameters.AddWithValue("@Id", Id);
                        command.CommandType = CommandType.StoredProcedure;
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
            }
        }

    }
}