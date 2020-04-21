CREATE TABLE tbl_CR_Details(
[CR_ID] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
[CrDescription] [nvarchar](max) NULL,
[ComplexityList] [nvarchar](50) NULL,
[DepartmentList] [nvarchar](50) NULL,
[CategoryList] [nvarchar](50) NULL,
[ProjectCompletedSchedule] [bit] NULL,
[KeyProjects] [bit] NULL,
[ProjectCRReceivedDate] [nvarchar](50) NULL,
[FinalProjectCRReceivedDate] [nvarchar](50) NULL,
[NoOfCRReceivedDuringUAT] [int] NULL,
[UATDeliveryDate] [nvarchar](50) NULL,
[UATSignoffDate] [nvarchar](50) NULL,
[ProjectCRLiveDate] [nvarchar](50) NULL,
[FirstCommittedLiveDate] [nvarchar](50) NULL,
[TAT] [nvarchar](50) NULL,
[NoOfShowstoppersPostGoLive] [int] NULL,
[UnitLead] [nvarchar](50) NULL,
[Manager] [nvarchar](50) NULL,
[ReasonRCA] [nvarchar](50) NULL,
[AttachFile] [varbinary](max) NULL,
[Created] [datetime2](3) NULL,
[modified] [datetime2](3) NULL,
CR_Status [nvarchar](50) NULL,
)






