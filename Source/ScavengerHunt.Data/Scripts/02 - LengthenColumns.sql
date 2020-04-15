USE ScavengerHunt
GO

ALTER TABLE HuntStepLink
ALTER COLUMN CorrectResponse nvarchar(MAX) NOT NULL

ALTER TABLE HuntStep
ALTER COLUMN [Url] nvarchar(200) NULL
