package com.college.placement.repositories;

import com.college.placement.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Student Repository
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, String> {

    /**
     * Find students by department
     */
    List<Student> findByDepartment(String department);

    /**
     * Find student by email
     */
    Optional<Student> findByEmail(String email);

    /**
     * Find student by reset token
     */
    Optional<Student> findByResetToken(String resetToken);

    // Find by year of passing
    List<Student> findByYearOfPassing(String yearOfPassing);

    // Find by training batch
    List<Student> findByTrainingBatch(String trainingBatch);

    // Find by academic year
    List<Student> findByAcademicYear(String academicYear);

    // Search by name (case-insensitive)
    @Query("SELECT s FROM Student s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Student> searchByName(@Param("name") String name);

    // Find by department and year
    List<Student> findByDepartmentAndYearOfPassing(String department, String yearOfPassing);

    // Count by department (case-insensitive)
    @Query("SELECT COUNT(s) FROM Student s WHERE UPPER(s.department) = UPPER(:department)")
    Long countByDepartment(@Param("department") String department);

    // Count by year of passing
    @Query("SELECT COUNT(s) FROM Student s WHERE s.yearOfPassing = :year")
    Long countByYearOfPassing(@Param("year") String year);

    // Check if register number exists
    boolean existsByRegisterNumber(String registerNumber);

    // Get all distinct academic years (batches)
    @Query("SELECT DISTINCT s.academicYear FROM Student s WHERE s.academicYear IS NOT NULL ORDER BY s.academicYear")
    List<String> findDistinctAcademicYears();

    // Get all distinct departments
    @Query("SELECT DISTINCT s.department FROM Student s WHERE s.department IS NOT NULL ORDER BY s.department")
    List<String> findDistinctDepartments();

    // Get distinct departments for a specific academic year
    @Query("SELECT DISTINCT s.department FROM Student s WHERE s.academicYear = :academicYear AND s.department IS NOT NULL ORDER BY s.department")
    List<String> findDistinctDepartmentsByAcademicYear(@Param("academicYear") String academicYear);

    // Get all distinct training batches
    @Query("SELECT DISTINCT s.trainingBatch FROM Student s WHERE s.trainingBatch IS NOT NULL ORDER BY s.trainingBatch")
    List<String> findDistinctTrainingBatches();

    // Get all distinct skills (returns comma-separated skills field)
    @Query("SELECT DISTINCT s.skills FROM Student s WHERE s.skills IS NOT NULL")
    List<String> findAllSkillsRaw();

    // Find by academic year and training batch
    List<Student> findByAcademicYearAndTrainingBatch(String academicYear, String trainingBatch);

    // Find by register number
    Optional<Student> findByRegisterNumber(String registerNumber);

    // Get all distinct batches (academic years)
    @Query("SELECT DISTINCT s.academicYear FROM Student s WHERE s.academicYear IS NOT NULL ORDER BY s.academicYear DESC")
    List<String> findDistinctBatches();

    // Count by batch (academic year)
    @Query("SELECT COUNT(s) FROM Student s WHERE s.academicYear = :batch")
    long countByBatch(@Param("batch") String batch);

    // Get student count by department
    @Query("SELECT s.department, COUNT(s) FROM Student s GROUP BY s.department")
    List<Object[]> getStudentCountByDepartment();
}
