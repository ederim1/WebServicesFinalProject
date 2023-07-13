const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
// Mongooose Models
const { reminder, user, team, theme } = require('../models/index');

// Reminders Type

const ReminderType = new GraphQLObjectType({
  name: 'reminder',
  fields: () => ({
    id: { type: GraphQLID },
    reminder: { type: GraphQLString },
    checkbox: { type: GraphQLBoolean },
    deadline: { type: GraphQLString },
    place: { type: GraphQLString },
    priority: { type: GraphQLBoolean },
    team: { type: GraphQLString },
    user: { type: GraphQLString },
  }),
});
// Team Type
const TeamType = new GraphQLObjectType({
  name: 'team',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    members: { type: GraphQLList(GraphQLString) },
  }),
});

//User Type
const UserType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

//Theme Type
const ThemeType = new GraphQLObjectType({
  name: 'theme',
  fields: () => ({
    id: { type: GraphQLID },
    color: { type: GraphQLString },
    font: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    //Get all Reminders and Reminder by ID
    reminder: {
      type: ReminderType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return reminder.findById(args.id);
      },
    },
    reminders: {
      type: new GraphQLList(ReminderType),
      resolve(parent, args) {
        return reminder.find({});
      },
    },
    //Get all Users and User by ID
    user: {
      type: UserType,
      resolve(parent, args) {
        return user.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return user.find({});
      },
    },

    //Get all Teams and Team by ID
    teams: {
      type: new GraphQLList(TeamType),
      resolve(parent, args) {
        return team.find({});
      },
    },
    team: {
      type: TeamType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return team.findById(args.id);
      },
    },
    // Get all Themes and Theme by ID
    themes: {
      type: new GraphQLList(TeamType),
      resolve(parent, args) {
        return theme.find({});
      },
    },
    theme: {
      type: TeamType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return theme.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // add reminder
    addReminder: {
      type: ReminderType,
      args: {
        reminder: { type: GraphQLNonNull(GraphQLString) },
        checkbox: { type: GraphQLNonNull(GraphQLBoolean) },
        deadline: { type: GraphQLNonNull(GraphQLString) },
        place: { type: GraphQLNonNull(GraphQLString) },
        priority: { type: GraphQLNonNull(GraphQLBoolean) },
        team: { type: GraphQLNonNull(GraphQLString) },
        user: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let newReminder = new reminder({
          reminder: args.reminder,
          checkbox: args.checkbox,
          deadline: args.deadline,
          place: args.place,
          priority: args.priority,
          team: args.team,
          user: args.user,
        });
        // save to db
        return newReminder.save();
      },
    },
    // add user
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let newUser = new user({
          name: args.name,
          email: args.email,
        });
        // save to db
        return newUser.save();
      },
    },
    // add team
    addTeam: {
      type: TeamType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        members: { type: GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        let newTeam = new team({
          name: args.name,
          members: args.members,
        });
        // save to db
        return newTeam.save();
      },
    },
    // add theme
    addTheme: {
      type: ThemeType,
      args: {
        color: { type: GraphQLNonNull(GraphQLString) },
        font: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let newTheme = new theme({
          color: args.color,
          font: args.font,
        });
        // save to db
        return newTheme.save();
      },
    },
    // Delete Reminder
    deleteReminder: {
      type: ReminderType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return reminder.findByIdAndDelete(args.id);
      },
    },

    // Delete User
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return user.findByIdAndDelete(args.id);
      },
    },

    // Delete Team
    deleteTeam: {
      type: TeamType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return team.findByIdAndDelete(args.id);
      },
    },
    // Delete Theme
    deleteTheme: {
      type: ThemeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return theme.findByIdAndDelete(args.id);
      },
    },

    // Update Reminder
    updateReminder: {
      type: ReminderType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        reminder: { type: GraphQLNonNull(GraphQLString) },
        checkbox: { type: GraphQLNonNull(GraphQLBoolean) },
        deadline: { type: GraphQLNonNull(GraphQLString) },
        place: { type: GraphQLNonNull(GraphQLString) },
        priority: { type: GraphQLNonNull(GraphQLBoolean) },
        team: { type: GraphQLNonNull(GraphQLString) },
        user: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        try {
          return reminder.findByIdAndUpdate(
            args.id,
            {
              reminder: args.reminder,
              checkbox: args.checkbox,
              deadline: args.deadline,
              place: args.place,
              priority: args.priority,
              team: args.team,
              user: args.user,
            },
            { new: true }
          );
        } catch (err) {
          console.log(err);
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
