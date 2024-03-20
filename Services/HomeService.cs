using PPMPS.Data;
using PPMPS.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;

namespace PPMPS.Services
{
    public class HomeService
    {

        public List<PPMP_HomeModel> GetList(PPMP_HomeModel homeModel)
        {
            var list = new List<PPMP_HomeModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_Graph";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", homeModel.Action);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_HomeModel home;
                        while (dr.Read())
                        {
                            home = new PPMP_HomeModel();
                            home.Program = dr["ProgramName"].ToString();
                            home.Qty = (int)dr["Qty"];
                            home.District = dr["DistrictName"].ToString();
                            list.Add(home);
                        }
                    }
                }
            }
            catch (Exception)
            {
                //do nothing
            }
            return list;
        }

        public List<PPMP_HomeModel> Get_Totals(PPMP_HomeModel homeModel)
        {
            var list = new List<PPMP_HomeModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_Graph";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", homeModel.Action);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_HomeModel home;
                        while (dr.Read())
                        {
                            home = new PPMP_HomeModel();
                            home.Qty = (int)dr["Qty"];
                            list.Add(home);
                        }
                    }
                }
            }
            catch (Exception)
            {
                //do nothing
            }
            return list;
        }

    }
}