using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using PPMPS.Common;
using PPMPS.Models;
using PPMPS.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.Services;

namespace PPMPS.Report
{
    public partial class PPMP_Reports : BasePage
    {
        private static ReportService _ReportService; 
        private static List<string> _results = new List<string>();
        private static string _reportPath = HttpContext.Current.Server.MapPath("~/GeneratedReports/Temp/");

        protected void Page_Load(object sender, EventArgs e)
        {
            _ReportService = new ReportService();
        }

        [WebMethod]
        public static string GetReportList(PPMP_ReportModel reports)
        {
            var data = _ReportService.ReportList(reports);
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static string GetReportData(PPMP_ReportModel reports)
        {
            string result = _ReportService.ReportDownload(reports);

            byte[] bytes = File.ReadAllBytes(_reportPath + "PPMP_" + reports.Module + "_Report.xlsx");

            _results.Clear();
            _results.Add(result);
            _results.Add(Convert.ToBase64String(bytes, 0, bytes.Length));

            return JsonConvert.SerializeObject(_results);
        }
    }
}