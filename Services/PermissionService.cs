using PPMPS.Data;
using PPMPS.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace PPMPS.Services
{
    public class PermissionService
    {
        public List<PPMP_PermissionModel> Get_Permission(string userCode)
        {
            var List = new List<PPMP_PermissionModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Permission";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@UserCode", userCode);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_PermissionModel permission;

                        while (dr.Read())
                        {
                            permission = new PPMP_PermissionModel();
                            permission.UserId = (int)dr["UserId"];
                            permission.UserName = dr["UserName"].ToString();
                            permission.ModuleCode = dr["ModuleCode"].ToString();
                            permission.ModuleName = dr["ModuleName"].ToString();
                            permission.DisplayText = dr["DisplayText"].ToString();
                            permission.Icon = dr["Icon"].ToString();
                            permission.Type = dr["Type"].ToString();
                            permission.PageOrder = dr["PageOrder"].ToString();
                            permission.TreeView = (int)dr["TreeView"];
                            List.Add(permission);
                        }
                    }
                }
                return List;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}