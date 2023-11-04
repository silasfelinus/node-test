-- AlterTable
ALTER TABLE `Bot` MODIFY `BotType` ENUM('CHATBOT', 'RAPBOT', 'CODEBOT', 'PRODUCTBOT', 'FORTUNEBOT', 'PROMPTMAKER', 'ARTMAKER', 'ARTREMIXER', 'ARTDESIGNER', 'STORYTELLER', 'QUESTMASTER', 'PROJECTMANAGER') NOT NULL DEFAULT 'CHATBOT';

-- AlterTable
ALTER TABLE `BotInput` MODIFY `BotType` ENUM('CHATBOT', 'RAPBOT', 'CODEBOT', 'PRODUCTBOT', 'FORTUNEBOT', 'PROMPTMAKER', 'ARTMAKER', 'ARTREMIXER', 'ARTDESIGNER', 'STORYTELLER', 'QUESTMASTER', 'PROJECTMANAGER') NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `birthday` VARCHAR(191) NULL;
