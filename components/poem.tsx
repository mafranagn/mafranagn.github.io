import { useRef } from 'react'
import { motion, useInView } from "framer-motion"
import styles from './poem.module.css'
import Link from 'next/link'
import Date from './date'

export default function Poem({ 
    content 
} : {
    content: {
        id: string
        date: string
        title: string
        snippet: string
    }
}
) {
    const ref = useRef(null);
    const isInView = useInView(ref, { 
        // margin: "0px 0px -400px 0px",
        once: true 
    });
    return (
        <motion.div ref={ref} style={{ 
                transform: isInView ? "none" : "translateY(25px)",
                opacity: isInView ? 1 : 0, 
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
            }} className={styles.poemContainer}>
            <Link className={styles.poemTitle} href={`/poetry/${content.id}`}>{content.title}</Link>
            <p className={styles.poemDate}>
                <Date dateString={content.date} />
            </p>
            <div className={styles.poemContent} dangerouslySetInnerHTML={{ __html: content.snippet }} />
            <Link className={styles.readMoreButton} href={`/poetry/${content.id}`}>Read More</Link>
        </motion.div>
  )
}
