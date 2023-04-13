const Worker = require('../models/worker');
const Supervisor = require('../models/Supervisor');
const Tasks = require('../models/Tasks');


module.exports.registerGetw = (req, res) => {

    // return res.send('<h1>hello</h1>');
    return res.render('registerWorker');
}
module.exports.registerPostw = async (req, res) => {

    let worker = req.body;
    console.log(worker);
    try {
        const worker = await Worker.create(req.body);
        console.log(worker);
        let minindex = 0;
        const supers = await Supervisor.find({}).lean();
        let val = 100000;
        for (i in supers) {
            if (supers[i].workers.length < val) {
                val = supers[i].workers.length;
                minindex = i;
            }
        }
        console.log(supers[minindex]);
        const reqSuper = await Supervisor.findOne({ _id: supers[minindex]._id });

        reqSuper.workers.push(worker._id);
        console.log(reqSuper + "this hs what you are looking for");
        await reqSuper.save();
    }
    catch (err) {
        console.log("error in creating worker");
    }

    return res.render('loginWorker');
}
module.exports.loginGetw = function (req, res) {

    return res.render('loginWorker');
}
module.exports.loginPostw = async function (req, res) {
    console.log(req.body);
    const user = await Worker.findOne({ contact: req.body.contact }).lean();
    if (!user) {
        console.log("user not found");
        return res.render('loginWorker');
    }
    const tasks = await Tasks.find({}).lean();

    req.user = user;

    console.log(user);

    let newtasks = [];
    for (let i in tasks) {
        console.log(i);
        console.log(tasks[i]);
        console.log(user._id);
        if (tasks[i].worker.toString() == user._id.toString()) {
            newtasks.push(tasks[i]);
        }
    }
    console.log(newtasks);
    console.log(tasks);
    if (req.body.password == user.password) {
        return res.render('workerProfile', {
            tasks: newtasks
        })
    }
    return res.rendirect('/registerWorker');
}


////////////////////////////////////////////////////////////////////////




module.exports.registerGets = (req, res) => {
    return res.render('registerSuper');
}
module.exports.registerPosts = async (req, res) => {
    console.log("hello");
    console.log(req.body);
    try {
        await Supervisor.create(req.body, function (err, worker) {
            if (err) {
                console.log(err);
                return res.render('registerSuper');
            }
            else {
                console.log("successfully registered supervisor");
                return res.render('loginSuper');
            }
        })
    }
    catch (err) {
        console.log(err);
        return res.redirect('register-s');
    }

}

module.exports.loginGets = function (req, res, next) {
    return res.render('loginSuper');
}
module.exports.loginPosts = async function (req, res, next) {
    console.log(req.body);
    try {
        const supervisor = await Supervisor.findOne({ contact: req.body.contact });
        if (!supervisor) {
            return res.render('loginSuper');
        }
        else {
            if (req.body.password == supervisor.password) {
                const workers = await Worker.find({}).lean();
                // console.log("here is what you are looking for >........>>>>> " + workers);
                return res.render('superProfile', {
                    workers: workers
                });
            }
        }

    }
    catch (err) {
        console.log(err);
        return res.render('loginSuper');
    }



}

////////////////////////////////////////////////////////////////////
module.exports.workerRender = async function (req, res, next) {

    const id = req.params.id;
    const tasks = await Tasks.find({}).lean();
    console.log(tasks);
    const onlyforThisworker = (task) => {
        return task.worker == id;
    }
    console.log(onlyforThisworker);
    const newtasks = tasks.filter(onlyforThisworker);
    console.log(newtasks);
    return res.render('workerProfile', { tasks: newtasks });
};
module.exports.handleFeedback = async function (req, res) {
    console.log(req.body);
    const workers = await Worker.find({});
    console.log(workers);
    let minindex = 0;
    let val = 10000;
    let reqid = 0;
    for (i in workers) {
        if (workers[i].tasks.length < val) {
            minindex = i;
            val = workers[i].tasks.length;
            reqid = workers[i]._id;
        }
    }
    const temp = await Tasks.create({ detail: req.body.feedback, worker: reqid, status: "pending" });
    console.log(temp);
    workers[minindex].tasks.push(temp);
    let reqWoker = await Worker.findOne({ _id: reqid });
    reqWoker.tasks.push(temp);
    reqWoker.save();
    // temp.worker = reqWoker.reqid;
    temp.save();
    console.log(reqWoker);

    return res.render('home');

}



module.exports.doneWork = async function (req, res) {
    const id = req.params.id;
    const task = await Tasks.findOne({ _id: id });

    const workerid = task.worker;
    const reqWoker = await Worker.findById({ _id: workerid });
    if (!reqWoker) {
        await Tasks.findByIdAndDelete(id);
        return res.redirect('back');
    }
    reqWoker.tasks = reqWoker.tasks.filter((task) => {
        return task != id
    })
    reqWoker.save();
    await Tasks.findOneAndDelete({ _id: id });
    console.log(reqWoker.tasks);
    return res.render('loginWorker');


}