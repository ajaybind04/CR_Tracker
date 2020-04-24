CREATE PROCEDURE sp_Save_Update_CR_Remarks_Details
@Operation VARCHAR(MAX)='',
@WhereQuery VARCHAR(MAX)='',
@RefCRID VARCHAR(150)='',
@Remark VARCHAR(MAX)='',
@LoginEmail VARCHAR(MAX)=''

AS BEGIN
DECLARE @STRSQL VARCHAR(MAX)
----------------------Operation For INSERT-------------------------
IF(@Operation = 'SAVE')
BEGIN
 SET @STRSQL = 'INSERT INTO tbl_cr_remark_details ([Ref_CR_ID],[CR_Remark],[CR_Remark_Saved_By],[CR_Remark_Saved_Date]) VALUES ('+ @RefCRID +', ' + @Remark +', '+ @LoginEmail+', GETDATE())';
END

----------------------Operation For UPDATE-------------------------
IF(@Operation = 'UPDATE')
BEGIN
SET @STRSQL ='UPDATE tbl_cr_remark_details SET [CR_Remark] =' + @Remark + ', [CR_Remark_Updated_By] =' + @LoginEmail + ', [CR_Remark_Updated_Date] = GETDATE() WHERE ('+@WhereQuery+')';
END

PRINT(@STRSQL)
EXEC(@STRSQL)
END



--insert
--sp_Add_Update_CR_Remarks_Details 'SAVE',null, '6', '''Insert By Procedure''','''ajaybind.hdfcergo@gmail.com'''

--update
--sp_Add_Update_CR_Remarks_Details 'UPDATE','CR_Remark_ID = 38', null, '''Insert By Procedure (Update)''','''ajaybind.hdfcergo@gmail.com'''