const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route GET api/profile/me
// @description Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route POST api/profile
// @description Create or update a user profile
// @access Private
router.post('/', [ auth, [
    check('status', 'Status is required')
        .not()
        .isEmpty(),
    check('skills', 'Skills are required')
        .not()
        .isEmpty()
    ]], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            company,
            interests,
            picture,
            website,
            location,
            bio,
            status,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company;
        if(interests) profileFields.interests = interests;
        if(picture) profileFields.picture = picture;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(bio) profileFields.bio = bio;
        if(status) profileFields.status = status;
        if(skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        // Build social object
        profileFields.social = {};
        if(youtube) profileFields.social.youtube = youtube;
        if(twitter) profileFields.social.twitter = twitter;
        if(facebook) profileFields.social.facebook = facebook;
        if(linkedin) profileFields.social.linkedin = linkedin;
        if(instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if(profile) {
                // If there is a profile it is updated
                    profile = await Profile.findOneAndUpdate(
                        { user: req.user.id },
                        { $set: profileFields },
                        { new: true });
                        return res.json(profile);
            }
                // If no profile is found create a new profile
                profile = new Profile(profileFields);
                await profile.save();
                res.json(profile);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
});

// @route GET api/profile
// @description Get all profiles
// @access Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route POST api/profile
//@decs Load more profiles and filter profiles on-click
//@access Public
router.post('/postload', async (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    let findArgs = {};
 
    for (let key in req.body.filters) {

        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    try {
        //add user details from the User collection
        const profiles = await Profile.find(findArgs)
        .populate('user', ['name', 'avatar'])
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit);
        res.json({profiles, postSize: profiles.length});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/profile/user/:user_id
// @description Get profile by user ID
// @access Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if(!profile) return res.status(400).json({ msg: 'Profile not found' });
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.name == 'CastError') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route DELETE api/profile
// @description Delete profile, user and post
// @access Private
router.delete('/', auth, async (req, res) => {
    try {
        // Delete users posts
        // We can comment Post.deleteMany line to keep posts even if account/profile are deleted
        await Post.deleteMany({ user: req.user.id });
        // Delete profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Delete user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route PUT api/profile/experience
// @description Add profile experience
// @access Private
router.put('/experience', [ auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),

]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    // Create and object from the above object
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // Add new experience to the front of the array of experiences
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route DELETE api/profile/experience/:exp_id
// @description Delete an experience from profile
// @access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      // Delete the experience with the matching ID from the params
      foundProfile.experience = foundProfile.experience.filter(exp => exp._id.toString() !== req.params.exp_id);
  
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
  });

// @route PUT api/profile/education
// @description Add profile education
// @access Private
router.put('/education', [ auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Area of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),

]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    // Create and object from the above object
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // Add new experience to the front of the array of experiences
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route DELETE api/profile/education/:edu_id
// @description Delete an education from profile
// @access Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      // Delete the education with the matching ID from the params
      foundProfile.education = foundProfile.education.filter(edu => edu._id.toString() !== req.params.edu_id);
  
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
  });

module.exports = router;