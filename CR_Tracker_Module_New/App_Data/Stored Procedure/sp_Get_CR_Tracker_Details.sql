ALTER PROCEDURE sp_Get_CR_Tracker_Details
@WhereQuery VARCHAR(MAX)=''

AS BEGIN
DECLARE @STRSQL VARCHAR(MAX)
SET @STRSQL = 'SELECT * FROM tbl_CR_Details ORDER BY CR_ID DESC';
 
IF(@WhereQuery IS NOT NULL AND @WhereQuery <>'')
BEGIN
 SET @STRSQL = 'SELECT * FROM tbl_CR_Details WHERE ('+@WhereQuery+') ORDER BY CR_ID DESC';
END
PRINT(@STRSQL)
EXEC(@STRSQL)
END


--sp_Get_CR_Tracker_Details 'CR_Status = ''UAT'''