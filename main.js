/**
 * An example of how you can send embeds
 */

// Extract the required classes from the discord.js module
const { Client, RichEmbed, MessageCollector } = require('discord.js');

// Create an instance of a Discord client
const client = new Client();

client.on('ready', () => {
    console.log('I am ready!');
});

var memberIDs = [];

client.on("message", message => {
    if (message.content == ">verify") {
        let member = message.member;
        let role = message.guild.roles.find(r => r.name === "Member");
        const embed = new RichEmbed()
            .setTitle('Welcome to clubBot!')
            .setColor("#FFA300")
            .setDescription("Let's get you verified as a member. Please enter your member ID to gain access");
        message.channel.send(embed)
            .then(() => {
                message.channel.awaitMessages(response => response.content, {
                    max: 1,
                    time: 30000,
                    errors: ['time'],
                })
                    .then((collected) => {
                        if (memberIDs.includes((collected.first().content))) {
                            const correct = new RichEmbed()
                                .setTitle(':white_check_mark: Verification Successful!')
                                .setColor("#66FF33")
                                .setDescription("You have now got full access to member privileges.");
                            message.channel.send(correct);
                            member.addRole(role).catch(console.error);
                        }

                        else {
                            const wrong = new RichEmbed()
                                .setTitle(':no_entry: Verification unsuccessful')
                                .setColor("#ff0000")
                                .setDescription("Sorry, we couldn't find that member ID in our system.");
                            message.channel.send(wrong);
                        }


                    })
                    .catch(() => {
                        const timeout = new RichEmbed()
                            .setTitle('Verification Timeout')
                            .setColor("#FFA300")
                            .setDescription("The verification process has ended due to no user giving an ID. Please run >verify to start again.");

                    });
            });
    }

    if (message.content == ">addID") {
        const embed = new RichEmbed()
            .setTitle("Let's add an ID!")
            .setColor("#FFA300")
            .setDescription("Please enter a User ID you'd like to add to the system");
        message.channel.send(embed)
            .then(() => {
                message.channel.awaitMessages(response => response.content, {
                    max: 1,
                    time: 30000,
                    errors: ['time'],
                })
                    .then((collected) => {
                        console.log("New ID added")
                        const newIDAdded = new RichEmbed()
                            .setTitle(':white_check_mark: User ID added')
                            .setColor("#66FF33")
                            .setDescription("A new user ID has been added to the system.");
                        message.channel.send(newIDAdded);
                        memberIDs.push(collected.first().content);
                    })
                    .catch(() => {
                        message.channel.send('There was no collected message that passed the filter within the time limit!');
                    });
            });
    }

    if (message.content == ">help") {
        message.channel.send({embed: {
            color: "#FFA300",
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: ":question: clubBot Help",
            url: "https://github.com/JoshuaLowe1002/clubBot/",
            description: "Here is a list of commands you can use with clubBot!",
            fields: [{
                name: "**>verify**",
                value: "Use this to verify that you're a member by entering you user ID."
              },
              {
                name: "**>addID**",
                value: "Admins can use this command to add a user ID into the system."
              },
              {
                name: "**>help**",
                value: "Display a list of commands you can use."
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "clubBot v1.0.0"
            }
          }
        });

    }

});


client.login(process.env.BOT_TOKEN);
