ALTER PROCEDURE sp_Get_Edit_Update_CR_Remarks_Details
@Operation VARCHAR(MAX)='',
@ColumnsList VARCHAR(MAX)='',
@WhereQuery VARCHAR(MAX)='',
@Remark VARCHAR(MAX)='',
@RefRemarkID VARCHAR(150)='',
@LoginEmail VARCHAR(MAX)=''

AS BEGIN
DECLARE @STRSQL VARCHAR(MAX)

------------------Operation For SELECT OR EDIT---------------------
IF(@Operation = 'SELECT' OR @Operation = 'EDIT')
BEGIN
--default option--
SET @STRSQL = 'SELECT * FROM tbl_cr_remark_details';
--Condition for column option---------
IF(@ColumnsList IS NOT NULL AND @ColumnsList <>'')
BEGIN
SET @STRSQL = 'SELECT ('+@ColumnsList+') FROM tbl_cr_remark_details';
END
--Condition for where condition------
IF(@WhereQuery IS NOT NULL AND @WhereQuery <>'')
BEGIN
	SET @STRSQL = @STRSQL + ' WHERE ('+@WhereQuery+') ORDER BY CR_Remark_ID DESC';
END
END

----------------------Operation For INSERT-------------------------
IF(@Operation = 'INSERT')
BEGIN
 SET @STRSQL = 'INSERT INTO tbl_cr_remark_details ([Ref_CR_ID],[CR_Remark],[CR_Remark_Saved_By],[CR_Remark_Saved_Date]) VALUES ('+ @RefRemarkID +', ' + @Remark +', '+ @LoginEmail+', GETDATE())';
END

----------------------Operation For UPDATE-------------------------
IF(@Operation = 'UPDATE')
BEGIN
SET @STRSQL ='UPDATE tbl_cr_remark_details SET [CR_Remark] =' + @Remark + ', [CR_Remark_Updated_By] =' + @LoginEmail + ', [CR_Remark_Updated_Date] = GETDATE() WHERE ('+@WhereQuery+')';
END
PRINT(@STRSQL)
EXEC(@STRSQL)
END

---Testing Only
----Select & Edit
--sp_Get_Edit_Update_CR_Remarks_Details 'SELECT', null,  null, null, null, null
--sp_Get_Edit_Update_CR_Remarks_Details 'SELECT', null, 'CR_Remark_ID = 35',  null, null, null
--sp_Get_Edit_Update_CR_Remarks_Details 'SELECT', 'CR_Remark', 'CR_Remark_ID = 35',  null, null, null

---Insert
sp_Get_Edit_Update_CR_Remarks_Details 'INSERT', null, null, null, '''SQL Tetsing''', '5', '''AjayBind@hdfcergo@.com'''

---Update
sp_Get_Edit_Update_CR_Remarks_Details 'UPDATE', null, 'CR_Remark_ID = 36',  '''SQL Tetsing By Ajay BIND''', null,'''AjayBind2@hdfcergo@.com'''
