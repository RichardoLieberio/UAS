import PropTypes from 'prop-types'
import { useState } from 'react'
import { MdOutlineStickyNote2 } from 'react-icons/md'
import { FaHeart, FaRegHeart, FaRegTrashAlt } from 'react-icons/fa'
import Note from './Note'

function CartProduct({ item, methods }) {
    const [count, setCount] = useState(item.count);
    const [like, setLike] = useState(item.like);
    const [note, setNote] = useState(item.note);
    const [showNote, setShowNote] = useState(false);

    function changeCount(e) {
        methods.changeCount(e, item);
        setCount(parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 1);
    }

    function minusCount() {
        methods.minusCount(item);
        setCount(count > 1 ? count - 1 : 1);
    }

    function addCount() {
        methods.addCount(item);
        setCount(count + 1);
    }

    function openNote() {
        setShowNote(true);
    }

    function closeNote() {
        setNote(item.note);
        setShowNote(false);
    }

    function changeNote(e) {
        setNote(e.target.value);
    }

    function saveNote() {
        methods.saveNote(note, item);
        setNote(note);
        setShowNote(false);
    }

    function toggleLike() {
        methods.toggleLike(item);
        setLike(!like);
    }

    return(
        <div className="flex py-4 mt-4">
            <input onChange={() => {methods.toggleSelected(item)}} checked={item.selected} type="checkbox" className="checkbox checkbox-info mr-4" />
            <figure className="mr-4">
                <img
                    src="https://via.placeholder.com/100"
                    alt="Product Image" />
            </figure>
            <div className='w-full flex flex-col justify-between'>
                <div>
                    <span className="flex items-center justify-between">
                        <h2 className="text-gray-900 text-xl tracking-tight dark:text-white line-clamp-1">{item.title}</h2>
                        <h2 className="text-gray-900 font-bold text-xl tracking-tight dark:text-white w-24 text-right">${(item.price * (100 - item.discount_percentage) / 100).toFixed(2)}</h2>
                    </span>
                    <span className="flex items-center justify-between">
                        <p className="text-sm font-bold text-gray-500 dark:text-white line-clamp-1">{item.description}</p>
                        <p className="text-sm font-bold text-gray-500 dark:text-white line-through w-24 text-right">${item.price}</p>
                    </span>
                </div>
                <span className="flex items-center justify-end gap-4 mt-2">
                    {item.note ? <button onClick={openNote} className="py-1.5 px-2 flex bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700 line-clamp-1 items-center"><span className="max-w-40 truncate">{item.note}</span><MdOutlineStickyNote2 className="text-xl ml-2" /></button> : <MdOutlineStickyNote2 onClick={openNote} className="text-2xl cursor-pointer" />}
                    {like ? <FaHeart onClick={toggleLike} className="text-xl cursor-pointer text-red-600" /> : <FaRegHeart onClick={toggleLike} className="text-xl cursor-pointer" />}
                    <FaRegTrashAlt onClick={() => {methods.removeItem(item)}} className="text-xl cursor-pointer" />
                    <button className="p-1.5 inline-block bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700">
                        <div className="flex items-center gap-x-1.5">
                            <div onClick={minusCount} className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md bg-white text-gray-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 cursor-pointer">
                                <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14" />
                                </svg>
                            </div>
                            <input onChange={changeCount} className="p-0 w-8 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" value={count}/>
                            <div onClick={addCount} className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md bg-white text-gray-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 cursor-pointer">
                                <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14" />
                                    <path d="M12 5v14" />
                                </svg>
                            </div>
                        </div>
                    </button>
                </span>
            </div>
            {showNote && <Note title={item.title} note={note} closeNote={closeNote} changeNote={changeNote} saveNote={saveNote} />}
        </div>
    )
}

CartProduct.propTypes = {
    item: PropTypes.object,
    methods: PropTypes.object,
}

export default CartProduct