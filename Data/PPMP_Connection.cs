using System.Configuration;
using System.Data.SqlClient;

namespace PPMPS.Data
{
    public static class PPMP_Connection
    {
        public static string connectionString { get;private set; }
        public static SqlDataReader sqlDataReader;

        static PPMP_Connection()
        {
            connectionString = ConfigurationManager.AppSettings["conPMPP"];
        }

        public static SqlConnection Create()
        {
            return new SqlConnection(connectionString);
        }

    }
}