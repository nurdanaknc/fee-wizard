import { useRouter } from 'next/router';
import React from 'react';

export default function Plans() {
    const router = useRouter();
    const { slug } = router.query;
    return (
        <div>
            Plans: {slug}
        </div>
    );
}