using PPMPS.Common;
using PPMPS.Data;
using PPMPS.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace PPMPS.Services
{
    public class ProgramService
    {
        public List<PPMP_ProgramModel> GetPrograms()
        {
            var list = new List<PPMP_ProgramModel>();
            try
            {
                using (var connection = PPMP_Connection.Create()) 
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Program";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "READ");
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_ProgramModel programs;
                        while (dr.Read())
                        {
                            programs = new PPMP_ProgramModel();
                            programs.ProgramName = dr["ProgramName"].ToString();
                            programs.Description = dr["Description"].ToString();
                            programs.Id = (int)dr["Id"];
                            list.Add(programs);
                        }
                    }
                }

            }
            catch (Exception)
            {
            }
            return list;
        }

        public void AddOrEdit(PPMP_ProgramModel programs)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Program";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", programs.Action);
                        command.Parameters.AddWithValue("@UserName", PPMP_Helpers.UserName);
                        command.Parameters.AddWithValue("@ProgramName", programs.ProgramName);
                        command.Parameters.AddWithValue("@Description", programs.Description);
                        command.Parameters.AddWithValue("@Id", programs.Id);
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
                        command.CommandText = "USP_M_Program";
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