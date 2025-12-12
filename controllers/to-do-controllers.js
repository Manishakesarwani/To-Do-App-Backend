const {ToDoModel} = require("../models/index");


exports.createToDo = async (req, res)=>{
    const {data} = req.body;

    if(!data || Object.keys(data).length===0){
        return res.status(400).json({
            success: false,
            message: "Please provide data for all the fields."
        });
    }
    data.isCompleted=false;

    const allToDo=await ToDoModel.find();

    const ttl=((data.title).replace(/\s+/g, "")).toLowerCase();
    let flag=0;

    // console.log("ttl",ttl);

    const dup_arr=allToDo.map((each)=>{
        let title=((each.title).replace(/\s+/g, "")).toLowerCase();
        // console.log("title", title);
        if(title === ttl){
            flag=1;
            // console.log(each);
            return each;
        }
        else{
            return {};
        }
    });

    // console.log(dup_arr);

    if(flag===1){
        return res.status(409).json({
            success: false,
            message: "This To-Do already exists in the system. Please mention a new one!",
            ToDo: dup_arr
        });
    }

    await ToDoModel.create(data);
    const allToDoNew=await ToDoModel.find();
    res.status(202).json({
        success: true,
        message: "To-do created successfully!",
        ToDoList: allToDoNew
    });
}

exports.getAllToDo = async (req, res) => {
    const getTodo=await ToDoModel.find();
    if(!getTodo || getTodo.length===0){
        return res.status(404).json({
            success: false,
            message: "No to-do present in the system!"
        });
    }
    res.status(202).json({
        success: true,
        toDoList: getTodo
    });
}

exports.getAllIncompleteToDo = async (req, res) =>{
    const incompleteToDo = await ToDoModel.find({
        isCompleted: false
    });

    const getAllToDo= await ToDoModel.find();

    if(!incompleteToDo || (await incompleteToDo).length===0){
        return res.status(404).json({
            success: false,
            message: "No incomplete To-Do in the system!",
            ToDoList: getAllToDo
        });
    }
    res.status(202).json({
        success: true,
        IncompleteToDos: incompleteToDo
    });
}

exports.getAllCompleteToDo = async (req, res) => {
    const completeToDos = await ToDoModel.find({
        isCompleted: true
    });

    const allToDos = await ToDoModel.find();

    if(!completeToDos || completeToDos.length===0){
        return res.status(404).json({
            success: false,
            message: "No complete To-Do is present in the system!",
            ToDoList: allToDos
        });
    }


    res.status(202).json({
        success: true,
        CompleteToDos: completeToDos
    });
}

exports.getToDoById = async (req, res) => {
    const {id} = req.params;

    const getToDo = await ToDoModel.findById(id);

    if(!getToDo || getToDo.length===0){
        return res.status(404).json({
            success: false,
            message: `No To-Do ${id} present in the system.`
        });
    }

    res.status(202).json({
        success: true,
        RequestedToDo: getToDo
    });
}

exports.updateToDoById = async (req, res) =>{
    const {id} = req.params;
    const getToDo = await ToDoModel.findById(id);
    const {data} = req.body;

    if(!getToDo || getToDo.length===0){
        return res.status(404).json({
            success: false,
            message: `No To-Do ${id} in the system!`
        });
    }
    if(data.title){
    const allToDo=await ToDoModel.find();

    const ttl=((data.title).replace(/\s+/g, "")).toLowerCase();
    let flag=0;

    // console.log("ttl",ttl);

    const dup_arr=allToDo.map((each)=>{
        let title=((each.title).replace(/\s+/g, "")).toLowerCase();
        // console.log("title", title);
        if(title === ttl){
            flag=1;
            // console.log(each);
            return each;
        }
        else{
            return {};
        }
    });

    // console.log(dup_arr);

    if(flag===1){
        return res.status(409).json({
            success: false,
            message: "The To-Do with this title already exists in the system. Please mention a new one!",
            ToDo: dup_arr
        });
    }
    }

    data.isCompleted=false;

    await ToDoModel.findOneAndUpdate({_id:id}, data, {new:true});

    const updatedToDo = await ToDoModel.findById(id);

    res.status(202).json({
        success: true,
        message: `The To-Do ${id} updated successfully!`,
        UpdatedToDo: updatedToDo
    });

}

exports.removeToDoById = async (req, res) => {
    const {id}=req.params;
    const getToDo = await ToDoModel.findById(id);

    if(!getToDo || getToDo.length===0){
        return res.status(404).json({
            success: false,
            message: `To-Do ${id} do not exists!`
        })
    }
    await ToDoModel.findByIdAndDelete(id);

    const allToDo = await ToDoModel.find();

    if(!allToDo || allToDo.length===0){
        return res.status(202).json({
            success: true,
            message: `To-Do ${id} has been removed successfully! The system does not constain any To-Do now.`
        })
    }
    res.status(202).json({
        success: true,
        message: `To-Do ${id} has been removed successfully!`,
        ToDoList: allToDo
    });
}

exports.removeCompleteToDo = async (req, res) => {
    const getToDo = await ToDoModel.find({
        isCompleted: true
    });
    console.log(getToDo);

    const allToDos = await ToDoModel.find();

    if(!getToDo || getToDo.length===0){
        return res.status(404).json({
            success: false,
            message: `No To-Do is completed yet!`,
            ToDoList: allToDos
        })
    }
    await ToDoModel.deleteMany({
        isCompleted: true
    });

    const allToDo = await ToDoModel.find();

    if(!allToDo || allToDo.length===0){
        return res.status(202).json({
            success: true,
            message: `All completed To-Dos has been removed successfully! The system does not constain any To-Do now.`
        })
    }
    res.status(202).json({
        success: true,
        message: `All completed To-Dos has been removed successfully!`,
        ToDoList: allToDo
    });
}

exports.toggleToDoStatusById = async (req, res) => {
    const {id} = req.params;
    const getToDo = await ToDoModel.findById(id);

    console.log(getToDo);

    if(!getToDo || getToDo.length===0){
        return res.status(404).json({
            success: false,
            message: `No To-Do ${id} is present in the system.`
        })
    }

    // getToDo.isCompleted=!(getToDo.isCompleted);

    const toggleStatus = await ToDoModel.findOneAndUpdate({_id:id}, {
        isCompleted: !getToDo.isCompleted
    },{new: true});

    res.status(202).json({
        success: true,
        message: `Status of the To-Do ${id} has been updated successfully!`,
        UpdatedToDo: toggleStatus
    });
}

exports.markAllToDoAsComplete = async (req, res) =>{
    const allToDo = await ToDoModel.find();

    if(!allToDo || allToDo.length===0){
        return res.status(404).json({
            success: false,
            message: "No To-Do present in the system!"
        });
    }

    const allToDoComplete = await ToDoModel.find({
        isCompleted: true
    });

    if(allToDo.length === allToDoComplete.length){
        return res.status(400).json({
            success: false,
            message: "All To-dos are already complete.",
            ToDoList: allToDoComplete
        });
    }

    await ToDoModel.updateMany(
        {},
        {
            $set: {isCompleted: true}
        }
    );

    const newToDos = await ToDoModel.find();

    res.status(202).json({
        success: true,
        message: "All To-Do are marked as complete successfully!",
        ToDoList: newToDos
    });
}

exports.markAllToDoAsIncomplete = async (req, res) => {
   const allToDo = await ToDoModel.find();

    if(!allToDo || allToDo.length===0){
        return res.status(404).json({
            success: false,
            message: "No To-Do present in the system!"
        });
    }
    const allToDoInComplete = await ToDoModel.find({
        isCompleted: false
    });

    if(allToDo.length === allToDoInComplete.length){
        return res.status(400).json({
            success: false,
            message: "All To-dos are already incomplete.",
            ToDoList: allToDoInComplete
        });
    }

    await ToDoModel.updateMany(
        {},
        {
            $set: {isCompleted: false}
        }
    );

    const newToDos = await ToDoModel.find();

    res.status(202).json({
        success: true,
        message: "All To-Do are marked as incomplete successfully!",
        ToDoList: newToDos
    }); 
}