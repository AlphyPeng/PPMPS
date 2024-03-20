using OfficeOpenXml;
using PPMPS.Data;
using PPMPS.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Web;

namespace PPMPS.Services
{
    public class ReportService
    {
        public List<PPMP_ReportModel> CheckLowStocks()
        {
            var list = new List<PPMP_ReportModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_Reports";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@module", "LowStocks");
                        SqlDataReader dr = command.ExecuteReader();
                        PPMP_ReportModel model;
                        while (dr.Read())
                        {
                            model = new PPMP_ReportModel();
                            model.ItemLowStocks = dr["LowStocks"].ToString();
                            model.Qty = (int)dr["counterx"];
                            list.Add(model);
                        }
                    }
                }
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
            return list;
        }

        public List<PPMP_ReportModel> ReportList(PPMP_ReportModel report)
        {
            var list = new List<PPMP_ReportModel>();
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        connection.Open();
                        command.CommandText = "USP_T_Reports";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@module", report.Action);
                        SqlDataReader dr = command.ExecuteReader();
                        PPMP_ReportModel model;
                        while (dr.Read())
                        {
                            model = new PPMP_ReportModel();
                            
                            if (report.Action == "PROGRAM")
                            {
                                model.LineItem = dr["ItemNo"].ToString();
                                model.ProgramTitle = dr["ProgramTitle"].ToString();
                                model.AccountTitle = dr["AccountTitle"].ToString();
                                model.ItemName = dr["ItemName"].ToString();
                                model.UnitOfIssue = dr["UnitOfIssue"].ToString();
                                model.Qty = (int)dr["Qty"];
                                model.Program = dr["ProgramName"].ToString();
                                model.Status = dr["Status"].ToString();
                            }
                            if (report.Action == "DISTRICT")
                            {
                                model.LineItem = dr["ItemNo"].ToString();
                                model.ProgramTitle = dr["ProgramTitle"].ToString();
                                model.AccountTitle = dr["AccountTitle"].ToString();
                                model.ItemName = dr["ItemName"].ToString();
                                model.UnitOfIssue = dr["UnitOfIssue"].ToString();
                                model.Qty = (int)dr["Qty"];
                                model.Program = dr["ProgramName"].ToString();
                                model.District = dr["DistrictName"].ToString();
                                model.Status = dr["Status"].ToString();
                            }

                            if (report.Action == "HEALTHCENTER")
                            {
                                model.LineItem = dr["ItemNo"].ToString();
                                model.ItemName = dr["ItemName"].ToString();
                                model.UnitOfIssue = dr["UnitOfIssue"].ToString();
                                model.Qty = (int)dr["Qty"];
                                model.District = dr["DistrictName"].ToString();
                                model.Barangay = dr["BrgyName"].ToString();
                                model.Status = dr["Status"].ToString();
                            }

                            if (report.Action == "PATIENT")
                            {
                                model.LineItem = dr["ItemNo"].ToString();
                                model.Patient = dr["FirstName"].ToString();
                                model.ItemName = dr["MedicineName"].ToString();
                                model.Qty = (int)dr["Qty"];
                                model.Status = dr["Status"].ToString();
                            }
                            if (report.Action == "FORECAST")
                            {
                                model.LineItem = dr["ItemNo"].ToString();
                                model.ItemName = dr["MedicineName"].ToString();
                                model.Year = dr["year"].ToString();
                                model.TotalQty = dr["total_quantity"].ToString();
                                model.AvgPerDay = dr["average_quantity_per_day"].ToString();
                                model.DaysRecorded = dr["days_recorded"].ToString();
                                model.Forecast = (int)dr["SafetyStocks_Forecast"];
                            }
                            list.Add(model);
                        }
                    }
                }              
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
            return list;
        }

        public string ReportDownload(PPMP_ReportModel report)
        {
            string result = "No Result";
            int i = 2;
            try
            {
                using (var connection = PPMP_Connection.Create())
                {
                    using (var command = connection.CreateCommand())
                    {
                        string templatePath = HttpContext.Current.Server.MapPath(@"~\GeneratedReports\Templates\Template.xlsx");
                        string copyPath = HttpContext.Current.Server.MapPath(@"~\GeneratedReports\Temp\PPMP_" + report.Module + "_Report.xlsx");

                        if (Directory.Exists(@"~\GeneratedReports\Temp\"))
                        {
                            Directory.CreateDirectory(@"~\GeneratedReports\Temp\");
                        }

                        if (File.Exists(templatePath))
                        {
                            try
                            {
                                File.Delete(copyPath);
                            }
                            catch
                            {
                            }
                            File.Copy(templatePath, copyPath);
                        }             
                        
                        FileInfo excelFile = new FileInfo(copyPath);
                        ExcelPackage excel = new ExcelPackage(excelFile);

                        connection.Open();
                        command.CommandText = "USP_T_Reports";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@module", report.Module);
                        SqlDataReader dr = command.ExecuteReader();

                        if (report.Action == "PROGRAM")
                        {
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 1].Value = "Line #";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 2].Value = "Program Title";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 3].Value = "Account Title";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 4].Value = "Item Name";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 5].Value = "Unit Of Issue";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 6].Value = "Qty";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 7].Value = "Program";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 8].Value = "Status";
                        }

                        if (report.Action == "DISTRICT")
                        {
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 1].Value = "Line #";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 2].Value = "Program Title";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 3].Value = "Account Title";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 4].Value = "Item Name";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 5].Value = "Unit Of Issue";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 6].Value = "Qty";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 7].Value = "Program";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 8].Value = "District";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 9].Value = "Status";
                        }

                        if (report.Action == "HEALTHCENTER")
                        {
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 1].Value = "Line #";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 2].Value = "Item Name";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 3].Value = "Unit Of Issue";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 4].Value = "Qty";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 5].Value = "District";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 6].Value = "Barangay";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 7].Value = "Status";
                        }

                        if (report.Action == "PATIENT")
                        {
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 1].Value = "Line #";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 2].Value = "First Name";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 3].Value = "MedicineName";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 4].Value = "Qty";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 5].Value = "Status";
                        }

                        if (report.Action == "FORECAST")
                        {
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 1].Value = "Line #";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 2].Value = "Item Name";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 3].Value = "Year";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 4].Value = "Total Quantity";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 5].Value = "Average Quantity Per Day";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 6].Value = "Days Recorded";
                            excel.Workbook.Worksheets["Sheet1"].Cells[1, 7].Value = "SafetyStocks Forecast";
                        }

                        while (dr.Read())
                        {
                            result = "True";
                            if (report.Action == "PROGRAM")
                            {
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 1].Value = dr["ItemNo"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 2].Value = dr["ProgramTitle"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 3].Value = dr["AccountTitle"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 4].Value = dr["ItemName"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 5].Value = dr["UnitOfIssue"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 6].Value = dr["Qty"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 7].Value = dr["ProgramName"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 8].Value = dr["Status"].ToString();

                            }

                            if (report.Action == "DISTRICT")
                            {
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 1].Value = dr["ItemNo"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 2].Value = dr["ProgramTitle"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 3].Value = dr["AccountTitle"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 4].Value = dr["ItemName"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 5].Value = dr["UnitOfIssue"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 6].Value = dr["Qty"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 7].Value = dr["ProgramName"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 8].Value = dr["DistrictName"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 9].Value = dr["Status"].ToString();
                            }

                            if (report.Action == "HEALTHCENTER")
                            {
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 1].Value = dr["ItemNo"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 2].Value = dr["ItemName"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 3].Value = dr["UnitOfIssue"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 4].Value = dr["Qty"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 5].Value = dr["DistrictName"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 6].Value = dr["BrgyName"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 7].Value = dr["Status"].ToString();
                            }

                            if (report.Action == "PATIENT")
                            {
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 1].Value = dr["ItemNo"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 2].Value = dr["FirstName"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 3].Value = dr["MedicineName"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 4].Value = dr["Qty"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 5].Value = dr["Status"].ToString();
                            }
                            if (report.Action == "FORECAST")
                            {
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 1].Value = dr["ItemNo"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 2].Value = dr["MedicineName"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 3].Value = dr["year"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 4].Value = dr["total_quantity"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 5].Value = dr["average_quantity_per_day"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 6].Value = dr["days_recorded"].ToString();
                                excel.Workbook.Worksheets["Sheet1"].Cells[i, 7].Value = dr["SafetyStocks_Forecast"].ToString();
                            }
                            i = i + 1;
                        }
                        excel.Save();
                    }
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }

            return result;
        }
    }
}