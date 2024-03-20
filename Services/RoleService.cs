using PPMPS.Common;
using PPMPS.Data;
using PPMPS.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace PPMPS.Services
{
    public class RoleService
    {
        public List<PPMP_RoleModel> GetRoles()
        {
            var list = new List<PPMP_RoleModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Roles";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "READ");
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_RoleModel roles;
                        while (dr.Read())
                        {
                            roles = new PPMP_RoleModel();
                            roles.RoleName = dr["RoleName"].ToString();
                            roles.Description = dr["RoleDescription"].ToString();
                            roles.Id = (int)dr["Id"];
                            list.Add(roles);
                        }
                    }
                }
            }
            catch (Exception)
            {
            }
            return list;
        }

        public void AddOrEdit(PPMP_RoleModel roles)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Roles";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", roles.Action);
                        command.Parameters.AddWithValue("@UserName", PPMP_Helpers.UserName);
                        command.Parameters.AddWithValue("@RoleName", roles.RoleName);
                        command.Parameters.AddWithValue("@Description", roles.Description);
                        command.Parameters.AddWithValue("@Id", roles.Id);
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
                        command.CommandText = "USP_M_Roles";
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
    }
}