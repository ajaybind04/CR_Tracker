CREATE PROCEDURE sp_Get_CR_Remarks_Details_For_Select_Edit
@WhereQuery VARCHAR(MAX)=''

AS BEGIN
DECLARE @STRSQL VARCHAR(MAX)
--default option--
SET @STRSQL = 'SELECT * FROM tbl_cr_remark_details ORDER BY CR_Remark_ID DESC';
IF(@WhereQuery IS NOT NULL AND @WhereQuery <>'')
BEGIN
	SET @STRSQL ='SELECT * FROM tbl_cr_remark_details WHERE ('+@WhereQuery+') ORDER BY CR_Remark_ID DESC';
END

PRINT(@STRSQL)
EXEC(@STRSQL)
END

--sp_Get_CR_Remarks_Details_For_Select_Edit
--sp_Get_CR_Remarks_Details_For_Select_Edit 'Ref_CR_ID = 5'
