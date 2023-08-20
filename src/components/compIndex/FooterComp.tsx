import { FaFacebook, FaInstagram, FaEnvelopeOpenText, FaWhatsapp, FaPortrait } from 'react-icons/fa'
import React from 'react';

const Footer_index = ({ }) => {
    return (
        <>
            <div>
                <div>
                    <h2>Contactos <FaPortrait className="icons"></FaPortrait></h2>
                    <div>
                        <h3>8324-4323</h3>
                        <h3>4342-5924</h3>
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <h2>WhatsApp <FaWhatsapp className="icons"></FaWhatsapp></h2>
                    <div>
                        <h3>8484-3323</h3>
                        <h3>7483-4934</h3>
                    </div>
                </div>
            </div>

            <div>
                <h1>Correos <FaEnvelopeOpenText className="icons"></FaEnvelopeOpenText></h1>
                <div>
                    <h3>extinsurdigital@gmail.com</h3>
                </div>
            </div>

            <div>

                <div>
                    <h2>Instagram <FaInstagram className="icons"></FaInstagram></h2>
                    <div>

                        <a className="linkMaps" href=" https://instagram.com/extinsurextintores?igshid=MzRlODBiNWFlZA== ">extinsurextintores</a>

                    </div>
                    <h2>Facebook <FaFacebook className="icons"></FaFacebook></h2>
                    <div>
                        <a className="linkMaps" href=" https://www.facebook.com/extinsur.extintores ">Extinsur Extintores </a>
                    </div>
                </div>
            </div>


        </>
    );
};
export default Footer_index;