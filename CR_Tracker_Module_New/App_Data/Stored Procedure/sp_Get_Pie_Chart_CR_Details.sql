CREATE PROCEDURE sp_Get_Pie_Chart_CR_Details
@WhereQuery VARCHAR(MAX)=''

AS BEGIN
DECLARE @STRSQL VARCHAR(MAX)
SET @STRSQL = 'SELECT CR_Status, COUNT(*) AS CR_Status_Count FROM tbl_CR_Details GROUP BY CR_Status';

IF(@WhereQuery IS NOT NULL AND @WhereQuery <>'')
BEGIN
 SET @STRSQL = 'SELECT CR_Status, COUNT(*) AS CR_Status_Count FROM tbl_CR_Details WHERE ('+@WhereQuery+') GROUP BY CR_Status';
END
PRINT(@STRSQL)
EXEC(@STRSQL)
END


--sp_Get_Pie_Chart_CR_Details 