import json
from pathlib import Path

root = Path(r'C:\Website-2')
recs = {
    'career': [
        {
            'tag': 'Career Growth',
            'title': 'Professional Training Path',
            'description': 'A structured route for learners who want stronger workplace readiness, professional confidence, and practical skill validation.'
        },
        {
            'tag': 'Workshops',
            'title': 'Industry Workshop Series',
            'description': 'Short-form, applied learning experiences that sharpen technical skills and connect students with real opportunities.'
        },
        {
            'tag': 'Certification',
            'title': 'Career-Ready Certification',
            'description': 'Focused programs that help students build recognizable expertise, confidence, and a stronger professional profile.'
        }
    ],
    'wellness': [
        {
            'tag': 'Wellness',
            'title': 'Aroma Wellness Path',
            'description': 'Learn essential oil applications, practical wellness routines, and meaningful care techniques for modern wellness practice.'
        },
        {
            'tag': 'Practice',
            'title': 'Hands-On Body Care',
            'description': 'Blend anatomy awareness, sensory care, and guided technique development into a confidence-building wellness track.'
        },
        {
            'tag': 'Development',
            'title': 'Advanced Wellness Practice',
            'description': 'Ideal for learners who want to continue growing through supervised practice and professional refinement.'
        }
    ],
    'aesthetics': [
        {
            'tag': 'Beauty',
            'title': 'Beauty & Natural Practices',
            'description': 'Explore beauty, body care, and natural wellness learning pathways designed for expressive, service-based work.'
        },
        {
            'tag': 'Creative',
            'title': 'Aesthetics & Expression',
            'description': 'Build confidence in appearance-focused, creativity-driven, and client-centered professional learning.'
        },
        {
            'tag': 'Branding',
            'title': 'Professional Styling & Experience',
            'description': 'Create a polished, client-ready presence through aesthetics, personal presentation, and service excellence.'
        }
    ],
    'holistic': [
        {
            'tag': 'Holistic',
            'title': 'Osteopathic Manual Therapy',
            'description': 'A deeper learning pathway combining assessment, manual techniques, and practical reasoning for integrated care.'
        },
        {
            'tag': 'Mind-Body',
            'title': 'Yoga & Body Awareness',
            'description': 'Combine movement, breathing, and mind-body awareness to develop grounded, supportive practice skills.'
        },
        {
            'tag': 'Community',
            'title': 'Practice Community & Mentorship',
            'description': 'Grow through connection, supervised learning, and collaborative professional exchange in community settings.'
        }
    ]
}

root.joinpath('recommendations.json').write_text(json.dumps(recs, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print('Generated recommendations.json')
