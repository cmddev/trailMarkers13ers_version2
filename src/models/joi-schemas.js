import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email({minDomainSegments: 2}).example("homer@simpson.com").required().messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Email needs to be in the form of xyz@domain.com"
    }),
    password: Joi.string().min(6).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be minimum 6 characters",
      "string.max": "Password must not exceed 20 characters",
      "object.regex": "Password must contain a lower case, upper case, number and special character"
    }),
    // confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").min(1).max(30).regex(/^[a-z ,.'-]+$/i).required().messages({
    "string.empty": "First Name cannot be empty",
    "string.max": "First Name cannot exceed 30 characters",
}),
  lastName: Joi.string().example("Simpson").min(1).max(30).regex(/^[a-z ,.'-]+$/i).required().messages({
    "string.empty": "Last Name cannot be empty",
    "string.max": "Last Name cannot exceed 30 characters",
  }),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const TrailSpec = Joi.object()
// need to add sanitization and validation of fields here.
  .keys({
        range: Joi.string().required().example("Front Range"),
        mountain: Joi.string().required().example("Mt Snowmass"),
        // latitude: Joi.number().allow("").optional().example(40.01),
        // longitude: Joi.number().allow("").optional().example(102.01),
        duration: Joi.number().allow("").optional().example(12),
        elevation: Joi.number().allow("").optional().example("13000"),
        category: Joi.string().required().example("Class 1"),
        effort: Joi.string().required().example("Medium"),
        trailRating: Joi.number().required().example("2"),
        reviewTrail: Joi.string().optional().example("I didn't think i'd have to walk so far"),
        images: Joi.array().items(Joi.object({
          _id: IdSpec,
          img: Joi.string(),
          imgid: Joi.string(),
      })),
    collectionid: IdSpec,
  })
  .label("Trail");

export const TrailSpecPlus = TrailSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("TrailPlus");

export const TrailArraySpec = Joi.array().items(TrailSpecPlus).label("TrailArray");

export const CollectionSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Beethoven Sonatas"),
    userid: IdSpec,
    trails: TrailArraySpec,
    img: Joi.string(),
    imgid: Joi.string()
  })
  .label("Collection");

export const CollectionSpecPlus = CollectionSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CollectionSpec");

export const CollectionArraySpec = Joi.array().items(CollectionSpecPlus).label("CollectionArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");