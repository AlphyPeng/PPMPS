using Newtonsoft.Json;
using PPMPS.Common;
using PPMPS.Data;
using PPMPS.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace PPMPS.Services
{
    public class PatientService
    {
        public List<PPMP_PatientModel> GetPatients()
        {
            var list = new List<PPMP_PatientModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Patient";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "READ");
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_PatientModel patient;
                        while (dr.Read())
                        {
                            patient = new PPMP_PatientModel();
                            patient.FirstName = dr["FirstName"].ToString();
                            patient.MiddleName = dr["MiddleName"].ToString();
                            patient.LastName = dr["LastName"].ToString();
                            patient.BirthDate = dr["BirthDate"].ToString();
                            patient.ContactNo = dr["ContactNo"].ToString();
                            patient.Email = dr["Email"].ToString();
                            patient.ContactNo = dr["ContactNo"].ToString();
                            patient.Address = dr["Address"].ToString();
                            patient.BrgyId = (int)dr["BrgyId"];
                            patient.BrgyName = dr["BrgyName"].ToString();
                            patient.DistrictId = (int)dr["DistrictId"];          
                            patient.DistrictName = dr["DistrictName"].ToString();                      
                            patient.Id = (int)dr["Id"];
                            list.Add(patient);
                        }
                    }
                }
            }
            catch (Exception)
            {
            }
            return list;
        }


        public void AddOrEdit(PPMP_PatientModel patient)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Patient";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", patient.Action);
                        command.Parameters.AddWithValue("@UserName", PPMP_Helpers.UserName);
                        command.Parameters.AddWithValue("@FirstName", patient.FirstName);
                        command.Parameters.AddWithValue("@LastName", patient.LastName);
                        command.Parameters.AddWithValue("@MiddleName", patient.MiddleName);
                        command.Parameters.AddWithValue("@Birthdate", patient.BirthDate);
                        command.Parameters.AddWithValue("@ContactNo", patient.ContactNo);
                        command.Parameters.AddWithValue("@Email", patient.Email);
                        command.Parameters.AddWithValue("@Address", patient.Address);
                        command.Parameters.AddWithValue("@BrgyId", patient.BrgyId);
                        command.Parameters.AddWithValue("@DistrictId", patient.DistrictId);
                        command.Parameters.AddWithValue("@Id", patient.Id);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch
            {
                //do nothing
            }
        }

        public List<PPMP_PatientModel> GetDropdown(string action)
        {
            var list = new List<PPMP_PatientModel>();

            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Patient";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", action);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_PatientModel patient;
                        while (dr.Read())
                        {
                            patient = new PPMP_PatientModel();
                            patient.BrgyName = dr["BrgyName"].ToString();
                            patient.BrgyId = (int)dr["BrgyId"];
                            patient.DistrictName = dr["DistrictName"].ToString();
                            patient.DistrictId = (int)dr["DistrictId"];
                            list.Add(patient);
                        }

                        command.ExecuteNonQuery();
                    }
                }
            }
            catch
            {
                //do nothing
            }

            return list;
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
                        command.CommandText = "USP_M_Patient";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "DELETE");
                        command.Parameters.AddWithValue("@Id", Id);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
                //do nothing
            }
        }

    }
}