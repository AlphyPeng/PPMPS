using PPMPS.Common;
using PPMPS.Data;
using PPMPS.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace PPMPS.Services
{
    public class SupplierService
    {

        public List<PPMP_SupplierModel> GetSupplier()
        {
            var list = new List<PPMP_SupplierModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Suppliers";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "Read");
                        SqlDataReader dr = command.ExecuteReader();

                        PPMP_SupplierModel suppliers;

                        while (dr.Read())
                        {
                            suppliers = new PPMP_SupplierModel();
                            suppliers.Id = (int)dr["Id"];
                            suppliers.SupplierCode = dr["SupplierCode"].ToString();
                            suppliers.SupplierName = dr["SupplierName"].ToString();
                            suppliers.ContactNo = dr["ContactNo"].ToString();
                            suppliers.Email = dr["Email"].ToString();
                            suppliers.ContactPerson = dr["ContactPerson"].ToString();
                            suppliers.SupplierAddress = dr["SupplierAddress"].ToString();
                            list.Add(suppliers);
                        }
                    }
                }
            }
            catch (Exception)
            {
            }
            return list;
        }
        public void AddOdEditSupplier(PPMP_SupplierModel suppliers)
        {
			try
			{
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Suppliers";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", suppliers.Action);
                        command.Parameters.AddWithValue("@UserName", PPMP_Helpers.UserName);
                        command.Parameters.AddWithValue("@SupplierName", suppliers.SupplierName);
                        command.Parameters.AddWithValue("@ContactNo", suppliers.ContactNo);
                        command.Parameters.AddWithValue("@Email", suppliers.Email);
                        command.Parameters.AddWithValue("@ContactPerson", suppliers.ContactPerson);
                        command.Parameters.AddWithValue("@SupplierAddress", suppliers.SupplierAddress);
                        command.Parameters.AddWithValue("@Id", suppliers.Id);
                        command.ExecuteNonQuery();
                    }
                }
            }
			catch (Exception)
			{
			}
        }

        public void DeleteSupplier(int Id)
        {
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_M_Suppliers";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Action", "Delete");
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