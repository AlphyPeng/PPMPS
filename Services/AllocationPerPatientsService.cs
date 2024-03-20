using PPMPS.Common;
using PPMPS.Data;
using PPMPS.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.EnterpriseServices;

namespace PPMPS.Services
{
    public class AllocationPerPatientsService
    {
        public string Generate_TransactionNo()
        {
            var NextCode = "";
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerPatient";
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
        public List<PPMP_AllocationPerPatientModel> GetPatients(string UserName)
        {
            var list = new List<PPMP_AllocationPerPatientModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerPatient";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "GetPatientList");
                        command.Parameters.AddWithValue("@UserName", UserName);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_AllocationPerPatientModel Patients;
                        while (dr.Read())
                        {
                            Patients = new PPMP_AllocationPerPatientModel();
                            Patients.Id = (int)dr["Id"];
                            Patients.FullName = dr["FullName"].ToString();
                            Patients.DistrictId = (int)dr["DistrictId"];
                            Patients.BarangayId = (int)dr["BrgyId"];
                            Patients.DistrictName = dr["DistrictName"].ToString();
                            Patients.BarangayName = dr["BarangayName"].ToString();
                            Patients.ContactNo = dr["ContactNo"].ToString();
                            Patients.Address = dr["Address"].ToString();
                            list.Add(Patients);
                        }
                    }
                }
            }
            catch (Exception)
            {
            }
            return list;
        }
        public List<PPMP_AllocationPerPatientModel> GetPatientByTransactionCode(string transactionCode)
        {
            var list = new List<PPMP_AllocationPerPatientModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerPatient";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "Get_Patient_header");
                        command.Parameters.AddWithValue("@TransactionCode", transactionCode);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_AllocationPerPatientModel Patients;
                        while (dr.Read())
                        {
                            Patients = new PPMP_AllocationPerPatientModel();
                            Patients.TransactionCode = dr["TransactionCode"].ToString();
                            Patients.PatientId = (int)dr["PatientId"];
                            Patients.FullName = dr["FullName"].ToString();
                            Patients.DistrictId = (int)dr["DistrictId"];
                            Patients.BarangayId = (int)dr["BrgyId"];
                            Patients.DistrictName = dr["DistrictName"].ToString();
                            Patients.BarangayName = dr["BarangayName"].ToString();
                            Patients.ContactNo = dr["ContactNo"].ToString();
                            Patients.Address = dr["Address"].ToString();
                            Patients.Status = dr["Status"].ToString();
                            Patients.Remarks = dr["Remarks"].ToString();
                            list.Add(Patients);
                        }
                    }
                }
            }
            catch (Exception)
            {
            }
            return list;
        }

        public void AddOrEditPatientHeader(PPMP_AllocationPerPatientModel patients)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerPatient";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", patients.Action);
                        command.Parameters.AddWithValue("@TransactionCode", patients.TransactionCode);
                        command.Parameters.AddWithValue("@PatientId", patients.PatientId);
                        command.Parameters.AddWithValue("@Remarks", patients.Remarks);
                        command.Parameters.AddWithValue("@UserName", PPMP_Helpers.UserName);
                        command.Parameters.AddWithValue("@Id", patients.Id);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
            }
        }

        public List<PPMP_AllocationPerPatientModel> GetTransactionCodes(string option, string UserName)
        {
            var list = new List<PPMP_AllocationPerPatientModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerPatient";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "READ_LIST_CODE");
                        command.Parameters.AddWithValue("@Option", option);
                        command.Parameters.AddWithValue("@UserName", UserName);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_AllocationPerPatientModel model;
                        while (dr.Read())
                        {
                            model = new PPMP_AllocationPerPatientModel();
                            model.TransactionCode = dr["TransactionCode"].ToString();
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

        public List<PPMP_AllocationPerPatientModel> GetMedicinePerLocation(int districtId, int brgyId)
        {
            var list = new List<PPMP_AllocationPerPatientModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerPatient";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "GET_Medicine_List");
                        command.Parameters.AddWithValue("@DistrictId", districtId);
                        command.Parameters.AddWithValue("@BarangayId", brgyId);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_AllocationPerPatientModel Medicine;

                        while (dr.Read())
                        {
                            Medicine = new PPMP_AllocationPerPatientModel();
                            Medicine.StockNo = dr["StockNo"].ToString();
                            Medicine.MedicineName = dr["MedicineName"].ToString();
                            list.Add(Medicine);
                        }
                    }
                }

            }
            catch (Exception)
            {
            }
            return list;
        }
        
        public void AddOrEditDetails(PPMP_AllocationPerPatientModel patient)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerPatient";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", patient.Action);
                        command.Parameters.AddWithValue("@TransactionCode", patient.TransactionCode);
                        command.Parameters.AddWithValue("@StockCode", patient.StockNo);
                        command.Parameters.AddWithValue("@Qty", patient.Qty);
                        command.Parameters.AddWithValue("@Id", patient.Id);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
            }
        }

        public List<PPMP_AllocationPerPatientModel> GetMedicineDetails(string transactionCode)
        {
            var List = new List<PPMP_AllocationPerPatientModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerPatient";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "GetPatientDetails");
                        command.Parameters.AddWithValue("@TransactionCode", transactionCode);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_AllocationPerPatientModel Medicines;

                        while (dr.Read())
                        {
                            Medicines = new PPMP_AllocationPerPatientModel();
                            Medicines.TransactionCode = dr["TransactionCode"].ToString();
                            Medicines.MedicineName = dr["MedicineName"].ToString();
                            Medicines.StockNo = dr["StockNo"].ToString();
                            Medicines.Qty = (int)dr["Qty"];
                            Medicines.Id = (int)dr["Id"];
                            List.Add(Medicines);
                        }
                    }
                }

            }
            catch (Exception)
            {
            }
            return List;
        }

        public void DeleteItem(int Id)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerPatient";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "DeletePatientDetails");
                        command.Parameters.AddWithValue("@Id", Id);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
            }
        }

        public void PostTransaction(string transactionCode)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerPatient";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "POST_Medicine");
                        command.Parameters.AddWithValue("@TransactionCode", transactionCode);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
            }
        }

        public void CancelTransaction(string transactionCode)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerPatient";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "Cancel_Transaction");
                        command.Parameters.AddWithValue("@TransactionCode", transactionCode);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
            }
        }


        public List<PPMP_AllocationPerPatientModel> CheckMedicineStocks(string code)
        {
            var list = new List<PPMP_AllocationPerPatientModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerPatient";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "CheckIfMedicineHasStocks");
                        command.Parameters.AddWithValue("@TransactionCode", code);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_AllocationPerPatientModel Medicine;

                        while (dr.Read())
                        {
                            Medicine = new PPMP_AllocationPerPatientModel();
                            Medicine.Qty = (int)dr["Qty"];
                            Medicine.Onhand = (int)dr["Quantity"];
                            Medicine.ThresHold = (int)dr["ThresHold"];
                            list.Add(Medicine);
                        }
                    }
                }

            }
            catch (Exception)
            {
            }
            return list;
        }
    }
}