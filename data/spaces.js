// data/spaces.js
export const spaceData = [
  {
    type: "coworking-office",
    cities: {
      mumbai: ["andheri", "kurla", "lower-parel", "malad"],
      "navi-mumbai": ["airoli"],
      pune: ["kharadi", "magarpatta-road"],
    },
  },
  {
    type: "coworking-dedicated-desk",
    cities: {
      "navi-mumbai": ["airoli"],
    },
  },
  {
    type: "coworking-flexi-desk",
    cities: {
      pune: ["kharadi", "magarpatta-road"],
    },
  },
  {
    type: "coworking-meeting-room",
    cities: {
      mumbai: ["andheri", "kurla", "malad"],
      "navi-mumbai": ["airoli"],
      pune: ["kharadi", "magarpatta-road"],
    },
  },
  {
    type: "coworking-conference-room",
    cities: {}, // Add cities as they become available
  },
  {
    type: "coworking-day-pass",
    cities: {
      mumbai: ["andheri", "kurla", "malad"],
      "navi-mumbai": ["airoli"],
      pune: ["kharadi"],
    },
  },
  {
    type: "coworking-virtual-office",
    cities: {
      mumbai: ["andheri", "kurla", "malad"],
      "navi-mumbai": ["airoli"],
      pune: ["kharadi"],
    },
  },
];
