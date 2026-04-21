package com.college.placement.dto.response;

import java.util.List;
import java.util.Map;

/**
 * Analytics DTO for admin dashboard charts
 */
public class AnalyticsDTO {

    private List<DepartmentStats> departmentWiseStudents;
    private List<BatchStats> batchWisePlacements;
    private List<CompanyStats> topCompanies;
    private Map<String, Long> requestStatusBreakdown;
    private List<MonthlyTrend> monthlyUpdateRequests;

    // Constructors
    public AnalyticsDTO() {
    }

    // Getters and Setters
    public List<DepartmentStats> getDepartmentWiseStudents() {
        return departmentWiseStudents;
    }

    public void setDepartmentWiseStudents(List<DepartmentStats> departmentWiseStudents) {
        this.departmentWiseStudents = departmentWiseStudents;
    }

    public List<BatchStats> getBatchWisePlacements() {
        return batchWisePlacements;
    }

    public void setBatchWisePlacements(List<BatchStats> batchWisePlacements) {
        this.batchWisePlacements = batchWisePlacements;
    }

    public List<CompanyStats> getTopCompanies() {
        return topCompanies;
    }

    public void setTopCompanies(List<CompanyStats> topCompanies) {
        this.topCompanies = topCompanies;
    }

    public Map<String, Long> getRequestStatusBreakdown() {
        return requestStatusBreakdown;
    }

    public void setRequestStatusBreakdown(Map<String, Long> requestStatusBreakdown) {
        this.requestStatusBreakdown = requestStatusBreakdown;
    }

    public List<MonthlyTrend> getMonthlyUpdateRequests() {
        return monthlyUpdateRequests;
    }

    public void setMonthlyUpdateRequests(List<MonthlyTrend> monthlyUpdateRequests) {
        this.monthlyUpdateRequests = monthlyUpdateRequests;
    }

    // Inner classes for structured data
    public static class DepartmentStats {
        private String department;
        private long studentCount;
        private long placedCount;

        public DepartmentStats() {
        }

        public DepartmentStats(String department, long studentCount, long placedCount) {
            this.department = department;
            this.studentCount = studentCount;
            this.placedCount = placedCount;
        }

        public String getDepartment() {
            return department;
        }

        public void setDepartment(String department) {
            this.department = department;
        }

        public long getStudentCount() {
            return studentCount;
        }

        public void setStudentCount(long studentCount) {
            this.studentCount = studentCount;
        }

        public long getPlacedCount() {
            return placedCount;
        }

        public void setPlacedCount(long placedCount) {
            this.placedCount = placedCount;
        }
    }

    public static class BatchStats {
        private String batch;
        private long totalStudents;
        private long placedStudents;
        private String placementRate;

        public BatchStats() {
        }

        public BatchStats(String batch, long totalStudents, long placedStudents, String placementRate) {
            this.batch = batch;
            this.totalStudents = totalStudents;
            this.placedStudents = placedStudents;
            this.placementRate = placementRate;
        }

        public String getBatch() {
            return batch;
        }

        public void setBatch(String batch) {
            this.batch = batch;
        }

        public long getTotalStudents() {
            return totalStudents;
        }

        public void setTotalStudents(long totalStudents) {
            this.totalStudents = totalStudents;
        }

        public long getPlacedStudents() {
            return placedStudents;
        }

        public void setPlacedStudents(long placedStudents) {
            this.placedStudents = placedStudents;
        }

        public String getPlacementRate() {
            return placementRate;
        }

        public void setPlacementRate(String placementRate) {
            this.placementRate = placementRate;
        }
    }

    public static class CompanyStats {
        private String company;
        private long hiredCount;
        private String avgPackage;

        public CompanyStats() {
        }

        public CompanyStats(String company, long hiredCount, String avgPackage) {
            this.company = company;
            this.hiredCount = hiredCount;
            this.avgPackage = avgPackage;
        }

        public String getCompany() {
            return company;
        }

        public void setCompany(String company) {
            this.company = company;
        }

        public long getHiredCount() {
            return hiredCount;
        }

        public void setHiredCount(long hiredCount) {
            this.hiredCount = hiredCount;
        }

        public String getAvgPackage() {
            return avgPackage;
        }

        public void setAvgPackage(String avgPackage) {
            this.avgPackage = avgPackage;
        }
    }

    public static class MonthlyTrend {
        private String month;
        private long pending;
        private long approved;
        private long rejected;

        public MonthlyTrend() {
        }

        public MonthlyTrend(String month, long pending, long approved, long rejected) {
            this.month = month;
            this.pending = pending;
            this.approved = approved;
            this.rejected = rejected;
        }

        public String getMonth() {
            return month;
        }

        public void setMonth(String month) {
            this.month = month;
        }

        public long getPending() {
            return pending;
        }

        public void setPending(long pending) {
            this.pending = pending;
        }

        public long getApproved() {
            return approved;
        }

        public void setApproved(long approved) {
            this.approved = approved;
        }

        public long getRejected() {
            return rejected;
        }

        public void setRejected(long rejected) {
            this.rejected = rejected;
        }
    }
}
