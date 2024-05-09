import React from 'react';

interface DropdownProps {
    menuActionHandler: (action: string) => void;
    menuItems: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ menuActionHandler, menuItems }): JSX.Element => {
    return (
        <div>
            <div id="dropdown" className="z-10 bg-white  divide-y divide-gray-100 rounded-lg shadow w-44 ">
                <ul className="py-2 text-sm ">
                    {
                        menuItems?.map((menuItem, index,) => {
                            return (
                                <li key={index}>
                                    <a className="block px-4 py-2 hover:bg-gray-100" onClick={() => menuActionHandler(menuItem)}>{menuItem}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default Dropdown;
