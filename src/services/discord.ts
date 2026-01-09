import { EmbedBuilder, WebhookClient } from "discord.js";

import env from "../configs/env";

export let discordClient: WebhookClient;

export const connectWebhookClient = () => {
  discordClient = new WebhookClient({
    url: env.discordWebhookUrl,
  });
};

export const sendDiscordNotification = async (
  title: string,
  description: string,
  content: string,
  level: "info" | "error" | "warning"
) => {
  const color =
    level === "info" ? 0x0099ff : level === "error" ? 0xef5350 : 0xffa500;

  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
    .addFields({
      name: "Server",
      value: env.env,
      inline: true,
    })
    .setTimestamp();

  await discordClient.send({
    content,
    embeds: [embed],
  });
};
