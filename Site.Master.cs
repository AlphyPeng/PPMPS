using PPMPS.Models;
using PPMPS.Services;
using System;
using System.Collections.Generic;
using System.Web.UI;

namespace PPMPS
{
    public partial class SiteMaster : MasterPage
    {
        private PermissionService _permissionService;
        private ReportService _reportService;
        protected void Page_Load(object sender, EventArgs e)
        {
            _permissionService = new PermissionService();
            _reportService = new ReportService();


            var lowStocks = _reportService.CheckLowStocks();

            if (Session["RoleName"] != null)
            {
                if(Session["RoleName"].ToString() == "District Pharmacist")
                {
                    if (lowStocks.Count > 0)
                    {
                        Session["CheckSessionLowStocksCounter"] = lowStocks.Count;

                        var list = new List<string>();
                        foreach (var item in lowStocks)
                        {
                            list.Add(item.ItemLowStocks);
                        }

                        Session["CheckSessionLowStocks"] = list;
                    }
                }
            }

            Session["MenuMaintenanceHasAny"] = "";
            Session["MenuReportHasAny"] = "";
            Session["MenuTransaction"] = "";
            Session["MenuMasterfile"] = "";
            Session["HasAllocationAccess"] = "";
            Session["HasLocationAccess"] = "";
            Session["HasUserAccess"] = "";

            if (Session["UserCode"] != null)
            {
                var transaction = new List<PPMP_PermissionModel>();
                var masterfile = new List<PPMP_PermissionModel>();
                var reports = new List<PPMP_PermissionModel>();

                var options = _permissionService.Get_Permission(Session["UserCode"].ToString());



                if (Session["UserCode"] != null)
                {
                    foreach (var items in options)
                    {
                        if (items.Type == "Transaction")
                        {
                            PPMP_PermissionModel permissionTransaction = new PPMP_PermissionModel();
                            permissionTransaction.ModuleCode = items.ModuleCode;
                            permissionTransaction.ModuleName = items.ModuleName;
                            permissionTransaction.DisplayText = items.DisplayText;
                            permissionTransaction.Icon = items.Icon;
                            permissionTransaction.TreeView = items.TreeView;
                            permissionTransaction.Type = items.Type;
                            transaction.Add(permissionTransaction);
                           
                            if (permissionTransaction.TreeView == 1)
                            {
                                Session["HasAllocationAccess"] = "Grant";
                            }
                        }
                        if (items.Type == "Masterfile")
                        {
                            PPMP_PermissionModel permissionMaintenance = new PPMP_PermissionModel();
                            permissionMaintenance.ModuleCode = items.ModuleCode;
                            permissionMaintenance.ModuleName = items.ModuleName;
                            permissionMaintenance.DisplayText = items.DisplayText;
                            permissionMaintenance.Icon = items.Icon;
                            permissionMaintenance.TreeView = items.TreeView;
                            permissionMaintenance.Type = items.Type;
                            
                            Session["MenuMaintenanceHasAny"] = "Grant";
                            if (permissionMaintenance.TreeView == 1)
                            {
                                Session["HasLocationAccess"] = "Grant";
                            }else if(permissionMaintenance.TreeView == 2)
                            {
                                Session["HasUserAccess"] = "Grant";
                            }
                            masterfile.Add(permissionMaintenance);
                        }
                        if (items.Type == "Reports")
                        {
                            PPMP_PermissionModel permissionReport = new PPMP_PermissionModel();
                            permissionReport.ModuleCode = items.ModuleCode;
                            permissionReport.ModuleName = items.ModuleName;
                            permissionReport.DisplayText = items.DisplayText;
                            permissionReport.Icon = items.Icon;
                            permissionReport.TreeView = items.TreeView;
                            permissionReport.Type = items.Type;
                            masterfile.Add(permissionReport);
                            Session["MenuReportHasAny"] = "Grant";
                        }
                    }
                    Session["MenuTransaction"] = transaction;
                    Session["MenuMaintenance"] = masterfile;
                    Session["MenuReport"] = reports;
                }
            }
        }



        protected void btn_SignOut(object sender, EventArgs e)
        {
            Session["UserCode"] = "";
            Session["RoleName"] = "";
            Session["MenuMaintenanceHasAny"] = "";
            Session["MenuReportHasAny"] = "";
            Session["MenuTransaction"] = "";
            Session["MenuMasterfile"] = "";
            Session["HasAllocationAccess"] = "";
            Session["HasLocationAccess"] = "";
            Session["HasUserAccess"] = "";
            Response.Redirect("~/Login.aspx", false);
        }
    }
}