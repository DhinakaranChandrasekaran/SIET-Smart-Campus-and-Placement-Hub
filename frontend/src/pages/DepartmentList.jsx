import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const departments = [
  {
    id: 'agri',
    name: 'Agricultural Engineering',
    image: '/images/department/dept/agriculture.jpg',
  },
  {
    id: 'ai-ds',
    name: 'Artificial Intelligence and Data Science',
    image: '/images/ai-ds.jpg',
  },
  {
    id: 'ai-ml',
    name: 'Artificial Intelligence and Machine Learning',
    image: '/images/ai-ml.jpg',
  },
  {
    id: 'biomed',
    name: 'Biomedical Engineering',
    image: '/images/biomed.jpg',
  },
  {
    id: 'biotech',
    name: 'Biotechnology',
    image: '/images/biotech.jpg',
  },
  {
    id: 'civil',
    name: 'Civil Engineering',
    image: '/images/civil.jpg',
  },
  {
    id: 'cse',
    name: 'Computer Science and Engineering',
    image: '/images/department/dept/cse.jpg',
  },
  {
    id: 'cse-cyber',
    name: 'Computer Science and Engineering (Cyber Security)',
    image: '/images/cse-cyber.jpg',
  },
  {
    id: 'eee',
    name: 'Electrical and Electronics Engineering',
    image: '/images/eee.jpg',
  },
  {
    id: 'ece',
    name: 'Electronics and Communication Engineering',
    image: '/images/ece.jpg',
  },
  {
    id: 'foodtech',
    name: 'Food Technology',
    image: '/images/foodtech.jpg',
  },
  {
    id: 'it',
    name: 'Information Technology',
    image: '/images/it.jpg',
  },
  {
    id: 'mech',
    name: 'Mechanical Engineering',
    image: '/images/mech.jpg',
  },
  {
    id: 'vlsi',
    name: 'Electronics Engineering (VLSI Design & Technology)',
    image: '/images/vlsi.jpg',
  },
];

const DepartmentList = () => {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCardClick = (id) => {
    navigate(`/department/${id}`);
  };

  return (
    <div className="dept-list-wrapper">
      <h2 className="dept-list-title">Our Departments</h2>
      <div className="dept-grid">
        {departments.map((dept) => (
          <div key={dept.id} className="dept-card" onClick={() => handleCardClick(dept.id)}>
            <img src={dept.image} alt={dept.name} />
            <div className="dept-name">{dept.name}</div>
          </div>
        ))}
      </div>

      <style>{`
        .dept-list-wrapper {
          background-color: #f0f8f0;
          padding: 0;
          min-height: 100vh;
        }

        .dept-list-title {
          text-align: center;
          color: green;
          font-size: 2.4rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          margin-top: 0;
          padding: 1.5rem 0;
          background-color: white;
        }

        .dept-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          padding: 1.5rem 2rem;
        }

        .dept-card {
          text-align: center;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 12px;
          overflow: hidden;
        }

        .dept-card img {
          width: 80%;
          height: 180px;
          object-fit: cover;
          border-radius: 12px 12px 0 0;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          display: block;
        }

        .dept-card:hover img {
          box-shadow: 0 6px 16px rgba(0, 128, 0, 0.25);
          transform: scale(1.01);
        }

        .dept-name {
          background-color: #f0f8f0;
          color: green;
          font-weight: 800;
          padding: 0.8rem;
          font-size: 1rem;
          border-radius: 0 0 12px 12px;
          margin-right: 6rem;
        }

        @media (max-width: 992px) {
          .dept-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .dept-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default DepartmentList;
