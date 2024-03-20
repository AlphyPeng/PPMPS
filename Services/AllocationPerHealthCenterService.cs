using PPMPS.Data;
using PPMPS.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System;
using Microsoft.SqlServer.Server;
using System.Net.Http.Headers;

namespace PPMPS.Services
{
    public class AllocationPerHealthCenterService
    {
       public List<PPMP_AllocationPerHealthCareModel> PPMP_Codes(string action, string option, string UserName)
        {
            var list = new List<PPMP_AllocationPerHealthCareModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerHealthCenter";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", action);
                        command.Parameters.AddWithValue("@Option", option);
                        command.Parameters.AddWithValue("@UserName", UserName);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_AllocationPerHealthCareModel model;
                        while (dr.Read())
                        {
                            model = new PPMP_AllocationPerHealthCareModel();
                            model.PpmpCode = dr["PPMPCode"].ToString();
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


        public List<PPMP_AllocationPerHealthCareModel> GetHealthCenterAllocationHeaders(string PpmpCodes)
        {
            var list = new List<PPMP_AllocationPerHealthCareModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerHealthCenter";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "READ_PPMPDETAILS");
                        command.Parameters.AddWithValue("@PPMPCode", PpmpCodes);
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_AllocationPerHealthCareModel model;
                        while (dr.Read())
                        {
                            model = new PPMP_AllocationPerHealthCareModel();
                            model.PpmpCode = dr["PPMPCode"].ToString();
                            model.ProgramTitle= dr["ProgramTitle"].ToString();
                            model.AccountTitle = dr["AccountTitle"].ToString();
                            model.Status = dr["Status"].ToString();
                            model.LineItem = dr["Lineitem"].ToString();
                            model.ItemName = dr["ItemName"].ToString();
                            model.UnitOfIssue = dr["UnitOfIssue"].ToString();
                            model.Qty = (int)dr["Qty"];
                            model.HealthCenter = dr["HealthCenter"].ToString();
                            model.Id = (int)dr["Id"];
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
    
         public void HealthCenterApprove(string PpmpCode)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_AllocationPerHealthCenter";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "Approve");
                        command.Parameters.AddWithValue("@PPMPCode", PpmpCode);
                        command.Parameters.AddWithValue("@Reciever", "User_Approve");
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (System.Exception)
            {

                throw;
            }
        }
    }
}