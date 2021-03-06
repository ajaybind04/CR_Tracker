﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CR_Tracker_Module_New.Models
{
    public class Model_Context
    { }

    public class CR_Tracker_Details
    {
        public Nullable<int> All_CR_Details_Count { get; set; }
        public Nullable<int> CR_Working_Count { get; set; }
        public Nullable<int> CR_Complete_Count { get; set; }
        public Nullable<int> CR_UAT_Count { get; set; }
    }

    public class CR_Pie_Chart_Count
    {
        public string CR_Status { get; set; }
        public int CR_Status_Count { get; set; }
    }

    public class CR_Stack_Bar_Count
    {
        public string CR_Months { get; set; }
        public int Completed_Count { get; set; }
        public int UAT_Count { get; set; }
        public int Pending_Count { get; set; }
        public int Other_Count { get; set; }
    }

    public class FileModel
    {
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public bool IsSelected { get; set; }
    }
}