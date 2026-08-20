import React, { useEffect, useRef, useState } from "react";
import RevealPanel from "../components/RevealPanel";
import gsap from "gsap";
import Top from "../components/Top";
import Bottom from "../components/Bottom";
import Navbar from "../components/Navbar";
import PagePreviewGrid from "../components/PagePreviewGrid";

export default function Home() {
    const [revealed, setRevealed] = useState(false);

    return (
        <div>
            <section className="relative mx-3 sm:mx-6 lg:mx-8 mt-6">
                <RevealPanel
                    radius={130}
                    // forceOpen={revealed}
                    className="rounded-2xl min-h-[85vh]"
                    bottom={
                        <Bottom revealed={revealed} setRevealed={setRevealed} />
                    }

                    top={
                        <Top revealed={revealed} setRevealed={setRevealed} />
                    }
                />
            </section>
        </div>
    );
}