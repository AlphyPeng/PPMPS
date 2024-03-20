using PPMPS.Common;
using PPMPS.Data;
using PPMPS.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace PPMPS.Services
{
    public class LocationService
    {
        public List<PPMP_LocationModel> GetDistrict()
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
                        command.Parameters.AddWithValue("@Action", "DISTRICT_READ");
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_LocationModel locations;

                        while (dr.Read())
                        {
                            locations = new PPMP_LocationModel();
                            locations.DistrictName = dr["Name"].ToString();
                            locations.DistrictDescription = dr["Description"].ToString();
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

        public void AddOrEditDistrict(PPMP_LocationModel locations)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Location";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", locations.Action);
                        command.Parameters.AddWithValue("@UserName", PPMP_Helpers.UserName);
                        command.Parameters.AddWithValue("@Name", locations.DistrictName);
                        command.Parameters.AddWithValue("@Description", locations.DistrictDescription);
                        command.Parameters.AddWithValue("@DistrictId", locations.DistrictId);
                        command.ExecuteNonQuery();

                    }
                }
            }
            catch (Exception)
            {
            }
        }

        public void DeleteDistrict(int Id)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Location";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "DISTRICT_DELETE");
                        command.Parameters.AddWithValue("@DistrictId", Id);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
            }
        }


        public List<PPMP_LocationModel> GetBarangay()
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
                        command.Parameters.AddWithValue("@Action", "BARANGAY_READ");
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_LocationModel locations;

                        while (dr.Read())
                        {
                            locations = new PPMP_LocationModel();
                            locations.BarangayName = dr["BrgyName"].ToString();
                            locations.BarangayDescription = dr["Description"].ToString();
                            locations.DistrictName = dr["DistrictName"].ToString();
                            locations.BarangayId = (int)dr["BrgyId"];
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

        public void AddOrEditBarangay(PPMP_LocationModel locations)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Location";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", locations.Action);
                        command.Parameters.AddWithValue("@UserName", PPMP_Helpers.UserName);
                        command.Parameters.AddWithValue("@Name", locations.BarangayName);
                        command.Parameters.AddWithValue("@Description", locations.BarangayDescription);
                        command.Parameters.AddWithValue("@DistrictId", locations.DistrictId);
                        command.Parameters.AddWithValue("@BrgyId", locations.BarangayId);
                        command.ExecuteNonQuery();

                    }
                }
            }
            catch (Exception)
            {
            }
        }

        public void DeleteBarangay(int Id)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Location";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "BARANGAY_DELETE");
                        command.Parameters.AddWithValue("@BrgyId", Id);
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