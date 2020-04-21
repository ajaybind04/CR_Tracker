CREATE TABLE tbl_cr_remark_details(
CR_Remark_ID INT PRIMARY KEY IDENTITY (1,1),
Ref_CR_ID INT,
CR_Remark NVARCHAR(MAX),
CR_Remark_Saved_By VARCHAR(250),
CR_Remark_Saved_Date DATETIME,
CR_Remark_Updated_By VARCHAR(250),
CR_Remark_Updated_Date DATETIME
)