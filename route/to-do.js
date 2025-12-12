const express=require("express");
const { getAllToDo, createToDo, getAllIncompleteToDo, getAllCompleteToDo, getToDoById, updateToDoById, removeToDoById, removeCompleteToDo, toggleToDoStatusById, markAllToDoAsComplete, markAllToDoAsIncomplete } = require("../controllers/to-do-controllers");
const router=express.Router();

/**
 * Route: /todo
 * Method: POST
 * Description: Create a new To-do in the system with a unique ID.
 */

router.post("/", createToDo);

/**
 * Route: /todo
 * Method: GET
 * Description: Get all the To-Dos from the system.
 */
router.get("/",getAllToDo);


/**
 * Route: /todo/incomplete
 * Method: GET
 * Description: Get all the incomplete To-Dos from the system.
 */
router.get("/incomplete", getAllIncompleteToDo);

/**
 * Route: /todo/complete
 * Method: GET
 * Description: Get all the complete To-Dos from the system.
 */
router.get("/complete", getAllCompleteToDo);

/**
 * Route: /todo/:id
 * Method: GET
 * Description: Get the to-do through its ID.
 */
router.get("/:id",getToDoById);

/**
 * Route: /todo/update/:id
 * Method: PUT
 * Description: Updating the title/description of the To-Do through its ID.
 */
router.put("/update/:id", updateToDoById);

/**
 * Route: /todo/remove/complete
 * Method: DELETE
 * Description: Delete all the completed To-Do.
 */

router.delete("/remove/complete", removeCompleteToDo);

/**
 * Route: /todo/remove/:id
 * Method: DELETE
 * Description: Delete the to-do of the shared ID.
 */

router.delete("/remove/:id", removeToDoById);

/**
 * Route: /todo/update/all/complete
 * Method: PATCH
 * Description: Updating the status of all the To-Do as complete.
 */
router.patch("/update/all/complete", markAllToDoAsComplete);

/**
 * Route: /todo/update/all/incomplete
 * Method: PATCH
 * Description: Updating the status of all the To-Do as incomplete.
 */
router.patch("/update/all/incomplete", markAllToDoAsIncomplete);


/**
 * Route: /todo/update/status/:id
 * Method: PATCH
 * Description: Toggle the status of the To-Do of the given ID.
 */
router.patch("/update/status/:id", toggleToDoStatusById);



module.exports=router;