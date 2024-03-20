using PPMPS.Common;
using PPMPS.Data;
using PPMPS.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace PPMPS.Services
{
    public class UserService
    {
        private PPMP_PasswordHelper _passwordHelper;
        public UserService()
        {
            _passwordHelper = new PPMP_PasswordHelper();
        }
        public List<PPMP_UserModel> GetUsersByUserName(string userName)
        {
            var list = new List<PPMP_UserModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Users";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "GetUser");
                        command.Parameters.AddWithValue("@UserName", userName);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_UserModel users;
                        while (dr.Read())
                        {
                            users = new PPMP_UserModel();
                            users.UserName = dr["UserName"].ToString();
                            users.RoleName = dr["RoleName"].ToString();
                            users.Password = dr["Password"].ToString();
                            list.Add(users);
                        }
                    }
                }
            }
            catch (Exception)
            {
            }
            return list;
        }

        public List<PPMP_UserModel> GetUserById(int Id)
        {
            var list = new List<PPMP_UserModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Users";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "GetUserById");
                        command.Parameters.AddWithValue("@Id", Id);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_UserModel users;
                        while (dr.Read())
                        {
                            users = new PPMP_UserModel();
                            users.UserName = dr["UserName"].ToString();
                            users.Password = _passwordHelper.DecodeFrom64(dr["Password"].ToString());
                            users.RoleId = (int)dr["RoleId"];
                            users.Modules = dr["Modules"].ToString();
                            users.Id = (int)dr["Id"];
                            users.DistrictId = (int)dr["DistrictId"];
                            users.DistrictName = dr["DistrictName"].ToString();
                            users.BarangayId = (int)dr["BarangayId"];
                            users.BarangayName = dr["BarangayName"].ToString();
                            list.Add(users);
                        }
                    }
                }
            }
            catch (Exception)
            {
            }
            return list;
        }

        public List<PPMP_UserModel> GetUsers()
        {
            var list = new List<PPMP_UserModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Users";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "READ");
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_UserModel users;
                        while (dr.Read())
                        {
                            users = new PPMP_UserModel();
                            users.UserName = dr["UserName"].ToString();
                            users.RoleName = dr["RoleName"].ToString();
                            users.Id = (int)dr["Id"];
                            users.DistrictId = (int)dr["DistrictId"];
                            users.BarangayId = (int)dr["BarangayId"];
                            list.Add(users);
                        }
                    }
                }
            }
            catch (System.Exception)
            {
            }
            return list;
        }

        public void AddOrEdit(PPMP_UserModel user)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Users";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", user.Action);
                        command.Parameters.AddWithValue("@UserCode", PPMP_Helpers.UserName);
                        command.Parameters.AddWithValue("@UserName", user.UserName);
                        command.Parameters.AddWithValue("@Password", _passwordHelper.EncodePasswordToBase64(user.Password));
                        command.Parameters.AddWithValue("@Modules", user.Modules);
                        command.Parameters.AddWithValue("@Roles", user.RoleId);
                        command.Parameters.AddWithValue("@Id", user.Id);
                        command.Parameters.AddWithValue("@BarangayId", user.BarangayId);
                        command.Parameters.AddWithValue("@DistrictId", user.DistrictId);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
            }
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
                        command.CommandText = "USP_M_Users";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "DELETE");
                        command.Parameters.AddWithValue("@Id", Id);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
            }
        }


        public List<PPMP_UserModel> GetDropdown(string action)
        {
            var list = new List<PPMP_UserModel>();

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

                        PPMP_UserModel User;
                        while (dr.Read())
                        {
                            User = new PPMP_UserModel();
                            User.BarangayName = dr["BrgyName"].ToString();
                            User.BarangayId = (int)dr["BrgyId"];
                            User.DistrictName = dr["DistrictName"].ToString();
                            User.DistrictId = (int)dr["DistrictId"];
                            list.Add(User);
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

    }
}