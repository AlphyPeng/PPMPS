using Newtonsoft.Json;
using PPMPS.Common;
using PPMPS.Models;
using PPMPS.Services;
using System;
using System.Web.Services;

namespace PPMPS.Masterfile
{
    public partial class PPMP_Medicine : BasePage
    {
        private static MedicineService _medicineService;
        protected void Page_Load(object sender, EventArgs e)
        {
            _medicineService = new MedicineService();
        }

        [WebMethod]
        public static string GetNextStockNo()
        {
            var data = _medicineService.StockNo();
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static string GetMedicineList()
        {
            var data = _medicineService.GetMedicines();
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static void AddOrEditMedicine(PPMP_MedicineModel medicine)
        {
            _medicineService.AddOrEdit(medicine);
        }

        [WebMethod]
        public static void DeleteMedicine(int Id)
        {
            _medicineService.Delete(Id);
        }
    }
}