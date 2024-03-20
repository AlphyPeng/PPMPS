using PPMPS.Common;
using PPMPS.Data;
using PPMPS.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace PPMPS.Services
{
    public class PharmacistService
    {
        public List<PPMP_PharmacistModel> GetPharmacist()
        {
            var List = new List<PPMP_PharmacistModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Pharmacist";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "READ");
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_PharmacistModel pharmacists;

                        while (dr.Read())
                        {
                            pharmacists = new PPMP_PharmacistModel();
                            pharmacists.Id = (int)dr["Id"];
                            pharmacists.DistrictId = (int)dr["DistrictId"];
                            pharmacists.DistrictName = dr["DistrictName"].ToString();
                            pharmacists.BarangayId = (int)dr["BrgyId"];
                            pharmacists.BarangayName = dr["BarangayName"].ToString();
                            pharmacists.FirstName  = dr["FirstName"].ToString();
                            pharmacists.MiddleName = dr["MiddleName"].ToString();
                            pharmacists.LastName = dr["LastName"].ToString();
                            pharmacists.ContactNo = dr["ContactNo"].ToString();
                            pharmacists.Email = dr["Email"].ToString();
                            pharmacists.Address = dr["Address"].ToString();
                            List.Add(pharmacists);
                        }
                    }
                }
            }
            catch (Exception)
            {
            }
            return List;
        }
        public void AddOrEditPharmacist(PPMP_PharmacistModel pharmacists)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Pharmacist";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", pharmacists.Action);
                        command.Parameters.AddWithValue("@UserName", PPMP_Helpers.UserName);
                        command.Parameters.AddWithValue("@DistrictId", pharmacists.DistrictId);
                        command.Parameters.AddWithValue("@BarangayId", pharmacists.BarangayId);
                        command.Parameters.AddWithValue("@FirstName", pharmacists.FirstName);
                        command.Parameters.AddWithValue("@MiddleName", pharmacists.MiddleName);
                        command.Parameters.AddWithValue("@LastName", pharmacists.LastName);
                        command.Parameters.AddWithValue("@ContactNo", pharmacists.ContactNo);
                        command.Parameters.AddWithValue("@Email", pharmacists.Email);
                        command.Parameters.AddWithValue("@Address", pharmacists.Address);
                        command.Parameters.AddWithValue("@Id", pharmacists.Id);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
            }
        }

        public void DeletePharmacist(int Id)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Pharmacist";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "DELETE");
                        command.Parameters.AddWithValue("@Id", Id);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        #region DropdownList
        public List<PPMP_LocationModel> GetDistrictList()
        {
            var List = new List<PPMP_LocationModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Location";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "GetDistrictList");
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_LocationModel locations;

                        while (dr.Read())
                        {
                            locations = new PPMP_LocationModel();
                            locations.DistrictName = dr["Name"].ToString();
                            locations.DistrictId = (int)dr["DistrictId"];
                            List.Add(locations);
                        }
                    }
                }
            }
            catch (Exception)
            {
            }
            return List;
        }

        public List<PPMP_LocationModel> GetBarangayList(int districtId)
        {
            var List = new List<PPMP_LocationModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {


                        connection.Open();
                        command.CommandText = "USP_M_Location";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "GetBarangayList");
                        command.Parameters.AddWithValue("@DistrictId", districtId);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_LocationModel locations;

                        while (dr.Read())
                        {
                            locations = new PPMP_LocationModel();
                            locations.BarangayName = dr["Name"].ToString();
                            locations.BarangayId = (int)dr["BrgyId"];
                            List.Add(locations);
                        }
                    }
                }

            }
            catch (Exception)
            {
            }
            return List;
        }
        #endregion
    }
}