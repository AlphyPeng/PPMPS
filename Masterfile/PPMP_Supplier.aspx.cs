using Newtonsoft.Json;
using PPMPS.Common;
using PPMPS.Models;
using PPMPS.Services;
using System;
using System.Web.Services;

namespace PPMPS.Masterfile
{
    public partial class PPMP_Supplier : BasePage
    {
        private static SupplierService _supplierService;
        protected void Page_Load(object sender, EventArgs e)
        {
           _supplierService = new SupplierService();
        }

        [WebMethod]
        public static string GetSupplier()
        {
            var data = _supplierService.GetSupplier();
            return JsonConvert.SerializeObject(data);

        }
        [WebMethod]
        public static void AddOrEditSupplier(PPMP_SupplierModel suppliers)
        {
            _supplierService.AddOdEditSupplier(suppliers);
        }

        [WebMethod]
        public static void Delete(int Id)
        {
            _supplierService.DeleteSupplier(Id);
        }
    }
}