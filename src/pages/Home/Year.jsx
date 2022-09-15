import React, { useEffect, useContext } from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import {CarSelectorContext} from '../../CarSelectorContext'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const Year = () => {
  const [availableYears, setAvailableYears] = useState([])
  const [selectedYear, setSelectedYear] = useState('')
  const [loading, setLoading] = useState(true)
const {handleYearSelection} = useContext(CarSelectorContext)
  const getYears = async () => {
    axios.get('https://www.fueleconomy.gov/ws/rest/vehicle/menu/year')
      .then(function (response) {
        setAvailableYears(response.data.menuItem)
       
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    try {
      getYears()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
    
  }, [])

  useEffect(()=>{
    if(availableYears.length > 0){
      setSelectedYear(availableYears[0].text)
    }
  },[availableYears])

const handleSelect = (e)=>{
  setSelectedYear(e)
  handleYearSelection(e)
}

  if (loading) {
    return 'loading'
  }
  
  if(!loading && availableYears.length > 0){
  return (
    <>
    <Listbox value={selectedYear} onChange={handleSelect} className="w-96">
        {({ open }) => (
          <>
            <Listbox.Label className=" text-center block text-sm font-medium text-gray-700 dark:text-orange-400 ">Car Year</Listbox.Label>
            <div className="relative mt-1 text-center">
              <Listbox.Button className="relative w-52 mx-auto cursor-pointer text-gray-900 rounded-md border border-gray-300 bg-white dark:text-gray-200 dark:bg-gray-700 dark:border-gray-900 py-2 pl-3 pr-10 text-left shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm">
                <span className="block truncate">{selectedYear ? selectedYear : null}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 left-0 right-0 w-52 m-auto overflow-auto rounded-md bg-white dark:text-gray-200 dark:bg-gray-700  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {availableYears.map((year) => (
                    <Listbox.Option
                      key={year.value}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-orange-400 font-bold' : 'text-gray-300',
                          'relative cursor-pointer select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={year.value}
                    >
                      {({ selectedYear, active }) => (
                        <>
                          <span className={classNames(selectedYear ? 'font-semibold' : 'font-normal', 'block truncate')}>
                            {year.text}
                          </span>

                          {selectedYear ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </>
    

    )
  }
}

export default Year
