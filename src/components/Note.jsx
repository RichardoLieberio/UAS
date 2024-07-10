import PropTypes from 'prop-types'

function Note({ title, note, closeNote, changeNote, saveNote }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-gray-900 text-xl tracking-tight dark:text-white line-clamp-1">Note for {title}</h2>
                <textarea value={note} onChange={changeNote} className="w-full h-20 p-2 mt-2 border border-gray-300 rounded-md resize-none" />
                <div className="flex gap-4">
                    <button onClick={closeNote} className="border-gray-200 text-gray-500 hover:text-gray-700 flex-1">Cancel</button>
                    <button onClick={saveNote} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 flex-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                </div>
            </div>
        </div>
    )
}

Note.propTypes = {
    title: PropTypes.string,
    note: PropTypes.string,
    changeNote: PropTypes.func,
    saveNote: PropTypes.func,
    closeNote: PropTypes.func,
}

export default Note