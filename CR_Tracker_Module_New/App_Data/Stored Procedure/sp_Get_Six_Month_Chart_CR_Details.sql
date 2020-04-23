CREATE PROCEDURE sp_Get_Six_Month_Chart_CR_Details
@WhereQuery VARCHAR(MAX)=''

AS BEGIN
DECLARE @STRSQL VARCHAR(MAX)
SET @STRSQL = 'SELECT ProjectCRReceivedDate, CR_Status FROM tbl_CR_Details WHERE (ProjectCRReceivedDate > dateadd(m, -6, getdate() - datepart(d, getdate()) + 1))';
 
IF(@WhereQuery IS NOT NULL AND @WhereQuery <>'')
BEGIN
 SET @STRSQL = 'SELECT ProjectCRReceivedDate, CR_Status FROM tbl_CR_Details WHERE (ProjectCRReceivedDate > dateadd(m, -6, getdate() - datepart(d, getdate()) + 1)) AND ('+@WhereQuery+')';
END
PRINT(@STRSQL)
EXEC(@STRSQL)
END


--sp_Get_Six_Month_Chart_CR_Details 











